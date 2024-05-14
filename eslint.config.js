 
import eslint from '@eslint/js';
import { config, configs as _configs } from 'typescript-eslint';

export default config(
  eslint.configs.recommended,
  ..._configs.recommended,
);


