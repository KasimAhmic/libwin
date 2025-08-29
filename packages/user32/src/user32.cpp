#include "user32.hpp"

Napi::Object Initialize(const Napi::Env env, Napi::Object exports)
{
  EXPORT(User32::GetClientRect);
  EXPORT(User32::MessageBoxW);
  EXPORT(User32::MessageBoxA);
  EXPORT(User32::MessageBoxExW);
  EXPORT(User32::MessageBoxExA);
  EXPORT(User32::MessageBoxIndirectW);
  EXPORT(User32::MessageBoxIndirectA);
  EXPORT(User32::CreateMenu);
  EXPORT(User32::DestroyMenu);
  EXPORT(User32::GetMenu);

  return exports;
}

NODE_API_MODULE(user32, Initialize)
