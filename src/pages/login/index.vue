<template>
  <a-form
      name="custom-validation"
      ref="formRef"
      :model="formState"
      :rules="rules"
      v-bind="layout"
      @finish="handleFinish"
      @finishFailed="handleFinishFailed"
  >
    <a-form-item required has-feedback label="用户名" name="name">
      <a-input v-model:value="formState.name" type="text" autocomplete="off"/>
    </a-form-item>
    <a-form-item has-feedback label="密码" name="password">
      <a-input v-model:value="formState.password" type="password" autocomplete="off"/>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" html-type="submit">登录</a-button>
      <a-button style="margin-left: 10px" @click="resetForm">重置</a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import {RuleObject, ValidateErrorEntity} from 'ant-design-vue/es/form/interface';
import {defineComponent, reactive, ref, UnwrapRef} from 'vue';
import {login} from "@/api";
import {message} from "ant-design-vue";
import {set} from "@/utils/storage";
import {useRouter} from "vue-router";

interface FormState {
  name: string;
  password: string;
}

export default defineComponent({
  setup() {
    const formRef = ref();
    const formState: UnwrapRef<FormState> = reactive({
      name: '',
      password: '',
    });

    let validateName = async (rule: RuleObject, value: string) => {
      if (value === '') {
        return Promise.reject('用户名不可以为空');
      } else {
        return Promise.resolve();
      }
    };
    let validatePassword = async (rule: RuleObject, value: string) => {
      if (value === '') {
        return Promise.reject('密码不可以为空');
      } else {
        return Promise.resolve();
      }
    };

    const rules = {
      name: [{validator: validateName, trigger: 'change'}],
      password: [{validator: validatePassword, trigger: 'change'}],
    };
    const layout = {
      labelCol: {span: 4},
      wrapperCol: {span: 14},
    };
    const route = useRouter()
    const handleFinish = (values: FormState) => {
      login(values).then(response => {
        const {code, msg} = response.data
        if (code === 1) {
          message.error(msg)
        } else {
          const {token} = response.data.data
          set('token', token)
          route.push('/')
        }
      })
    };
    const handleFinishFailed = (errors: ValidateErrorEntity<FormState>) => {
      console.log(errors);
    };
    const resetForm = () => {
      formRef.value.resetFields();
    };
    return {
      formState,
      formRef,
      rules,
      layout,
      handleFinishFailed,
      handleFinish,
      resetForm,
    };
  },
});
</script>

