#include "user32.hpp"

Napi::Value User32::LoadCursorW(const Napi::CallbackInfo &info) {
  const QB_ARG(hInstanceOpt, qb::ReadOptionalHandle<HINSTANCE>(info, 0));
  HINSTANCE hInstance = hInstanceOpt.value_or(static_cast<HINSTANCE>(0));

  std::wstring cursorName;
  LPCWSTR lpCursorName = nullptr;

  const Napi::Value cursorArg = info[1];

  if (cursorArg.IsBigInt()) {
    const uint64_t id = qb::ReadRequiredUint64(info, 1);
    QB_THROW_IF_PENDING();
    lpCursorName = reinterpret_cast<LPCWSTR>(static_cast<ULONG_PTR>(static_cast<WORD>(id)));
  } else if (cursorArg.IsString()) {
    if (!hInstanceOpt.has_value() || hInstance == nullptr) {
      Napi::TypeError::New(info.Env(), "String resource names require a non-null hInstance")
          .ThrowAsJavaScriptException();

      return info.Env().Undefined();
    }

    cursorName = qb::ReadRequiredWideString(info, 1);
    QB_THROW_IF_PENDING();
    lpCursorName = cursorName.c_str();

  } else {
    Napi::TypeError::New(info.Env(), "Expected argument at index 1 to be a String or BigInt")
        .ThrowAsJavaScriptException();

    return info.Env().Undefined();
  }

  HCURSOR hCursor = ::LoadCursorW(hInstance, lpCursorName);

  return qb::HandleToBigInt(info, hCursor);
}

Napi::Value User32::LoadCursorA(const Napi::CallbackInfo &info) {
  const QB_ARG(hInstanceOpt, qb::ReadOptionalHandle<HINSTANCE>(info, 0));
  HINSTANCE hInstance = hInstanceOpt.value_or(static_cast<HINSTANCE>(0));

  std::string cursorName;
  LPCSTR lpCursorName = nullptr;

  const Napi::Value cursorArg = info[1];

  if (cursorArg.IsBigInt()) {
    const uint64_t id = qb::ReadRequiredUint64(info, 1);
    QB_THROW_IF_PENDING();
    lpCursorName = reinterpret_cast<LPCSTR>(static_cast<ULONG_PTR>(static_cast<WORD>(id)));
  } else if (cursorArg.IsString()) {
    if (!hInstanceOpt.has_value() || hInstance == nullptr) {
      Napi::TypeError::New(info.Env(), "String resource names require a non-null hInstance")
          .ThrowAsJavaScriptException();

      return info.Env().Undefined();
    }

    cursorName = qb::ReadRequiredString(info, 1);
    QB_THROW_IF_PENDING();
    lpCursorName = cursorName.c_str();

  } else {
    Napi::TypeError::New(info.Env(), "Expected argument at index 1 to be a String or BigInt")
        .ThrowAsJavaScriptException();

    return info.Env().Undefined();
  }

  HCURSOR hCursor = ::LoadCursorA(hInstance, lpCursorName);

  return qb::HandleToBigInt(info, hCursor);
}
