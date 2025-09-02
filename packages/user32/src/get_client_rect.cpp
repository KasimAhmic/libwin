#include "user32.hpp"

Napi::Value User32::GetClientRect(const Napi::CallbackInfo &info) {
  const Napi::Env env = info.Env();

  const QB_ARG(hWnd, qb::ReadRequiredHandle<HWND>(info, 0));
  const QB_ARG(lpRect, qb::ReadRequiredObject(info, 1));

  auto rect = RECT{};

  const BOOL error = GetClientRect(hWnd, &rect);

  lpRect.Set("left", Napi::Number::New(env, rect.left));
  lpRect.Set("top", Napi::Number::New(env, rect.top));
  lpRect.Set("right", Napi::Number::New(env, rect.right));
  lpRect.Set("bottom", Napi::Number::New(env, rect.bottom));

  return Napi::Boolean::New(env, static_cast<bool>(error));
}
