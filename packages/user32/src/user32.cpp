#include "user32.hpp"

Napi::Object Initialize(const Napi::Env env, Napi::Object exports) {
  QB_EXPORT(User32::GetClientRect);
  QB_EXPORT(User32::MessageBoxW);
  QB_EXPORT(User32::MessageBoxA);
  QB_EXPORT(User32::MessageBoxExW);
  QB_EXPORT(User32::MessageBoxExA);
  QB_EXPORT(User32::MessageBoxIndirectW);
  QB_EXPORT(User32::MessageBoxIndirectA);
  QB_EXPORT(User32::CreateMenu);
  QB_EXPORT(User32::DestroyMenu);
  QB_EXPORT(User32::GetMenu);
  QB_EXPORT(User32::AppendMenuA);
  QB_EXPORT(User32::AppendMenuW);
  QB_EXPORT(User32::SetMenu);
  QB_EXPORT(User32::CreateWindowExW);
  QB_EXPORT(User32::RegisterClassExW);
  QB_EXPORT(User32::GetMessageW);
  QB_EXPORT(User32::TranslateMessage);
  QB_EXPORT(User32::DispatchMessageW);
  QB_EXPORT(User32::ShowWindow);
  QB_EXPORT(User32::UpdateWindow);
  QB_EXPORT(User32::DefWindowProcW);
  QB_EXPORT(User32::PostQuitMessage);

  return exports;
}

NODE_API_MODULE(user32, Initialize)
