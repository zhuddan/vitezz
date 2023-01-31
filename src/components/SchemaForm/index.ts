import 'element-plus/dist/index.css';

import { withInstall } from '@/utils';
import schemaFormItem from './components/SchemaFormItem.vue';
import useForm from './hooks/useForm';
import schemaForm from './SchemaForm.vue';
export const SchemaForm = withInstall(schemaForm);
export const SchemaFormItem = withInstall(schemaFormItem);

export { useForm };

export default SchemaForm;
