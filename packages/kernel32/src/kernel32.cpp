#include "kernel32.hpp"

Napi::Object Initialize(const Napi::Env env, Napi::Object exports)
{
  EXPORT(Kernel32::GetLastError);

  return exports;
}

NODE_API_MODULE(kernel32, Initialize)
