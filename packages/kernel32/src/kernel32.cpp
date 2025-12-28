#include "kernel32.hpp"

Napi::Object Initialize(const Napi::Env env, Napi::Object exports) {
  QB_EXPORT(Kernel32::GetLastError);
  QB_EXPORT(Kernel32::GetModuleHandleW);
  QB_EXPORT(Kernel32::CreateActCtxW);
  QB_EXPORT(Kernel32::ActivateActCtx);
  QB_EXPORT(Kernel32::FormatMessageW);
  QB_EXPORT(Kernel32::FormatMessageA);
  QB_EXPORT(Kernel32::GetCommandLineW);
  QB_EXPORT(Kernel32::GetCommandLineA);
  QB_EXPORT(Kernel32::GetStartupInfoW);

  return exports;
}

NODE_API_MODULE(kernel32, Initialize)
