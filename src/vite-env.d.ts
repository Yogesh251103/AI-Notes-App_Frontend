/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_BACKEND_URL_DEV: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }