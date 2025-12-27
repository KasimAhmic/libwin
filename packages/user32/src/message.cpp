#include "user32.hpp"

Napi::Value User32::PostQuitMessage(const Napi::CallbackInfo &info) {
  const QB_ARG(nExitCode, qb::ReadRequiredInt32(info, 0));

  ::PostQuitMessage(nExitCode);

  return info.Env().Undefined();
}

Napi::Value User32::GetMessageW(const Napi::CallbackInfo &info) {
  const Napi::Env env = info.Env();

  const QB_ARG(lpMsg, qb::ReadRequiredObject(info, 0));
  const QB_ARG(hWnd, qb::ReadOptionalHandle<HWND>(info, 1));
  const QB_ARG(wMsgFilterMin, qb::ReadRequiredUint32(info, 2));
  const QB_ARG(wMsgFilterMax, qb::ReadRequiredUint32(info, 3));

  MSG msg{};

  const BOOL result = ::GetMessageW(&msg, hWnd ? hWnd.value() : nullptr, wMsgFilterMin, wMsgFilterMax);

  Napi::Object pt = Napi::Object::New(env);
  pt.Set("x", Napi::Number::New(env, msg.pt.x));
  pt.Set("y", Napi::Number::New(env, msg.pt.y));

  lpMsg.Set("hwnd", qb::HandleToBigInt(info, msg.hwnd));
  lpMsg.Set("message", Napi::Number::New(env, msg.message));
  lpMsg.Set("wParam", Napi::BigInt::New(env, static_cast<uint64_t>(msg.wParam)));
  lpMsg.Set("lParam", Napi::BigInt::New(env, static_cast<uint64_t>(msg.lParam)));
  lpMsg.Set("time", Napi::Number::New(env, msg.time));
  lpMsg.Set("pt", pt);

  return Napi::Boolean::New(env, result);
}

Napi::Value User32::TranslateMessage(const Napi::CallbackInfo &info) {
  const Napi::Env env = info.Env();

  const QB_ARG(lpMsg, qb::ReadRequiredObject(info, 0));

  const QB_ARG(hwnd, qb::ReadRequiredHandle<HWND>(lpMsg, "hwnd"));
  const QB_ARG(message, qb::ReadRequiredUint32(lpMsg, "message"));
  const QB_ARG(wParam, qb::ReadRequiredUint64(lpMsg, "wParam"));
  const QB_ARG(lParam, qb::ReadRequiredInt64(lpMsg, "lParam"));
  const QB_ARG(time, qb::ReadRequiredUint32(lpMsg, "time"));
  const QB_ARG(ptObj, qb::ReadRequiredObject(lpMsg, "pt"));

  const QB_ARG(x, qb::ReadRequiredInt32(ptObj, "x"));
  const QB_ARG(y, qb::ReadRequiredInt32(ptObj, "y"));

  MSG msg{hwnd, message, wParam, lParam, time, {x, y}};

  const BOOL result = ::TranslateMessage(&msg);

  return Napi::Boolean::New(env, result);
}

Napi::Value User32::DispatchMessageW(const Napi::CallbackInfo &info) {
  const Napi::Env env = info.Env();

  const QB_ARG(lpMsg, qb::ReadRequiredObject(info, 0));

  const QB_ARG(hwnd, qb::ReadRequiredHandle<HWND>(lpMsg, "hwnd"));
  const QB_ARG(message, qb::ReadRequiredUint32(lpMsg, "message"));
  const QB_ARG(wParam, qb::ReadRequiredUint64(lpMsg, "wParam"));
  const QB_ARG(lParam, qb::ReadRequiredInt64(lpMsg, "lParam"));
  const QB_ARG(time, qb::ReadRequiredUint32(lpMsg, "time"));
  const QB_ARG(ptObj, qb::ReadRequiredObject(lpMsg, "pt"));

  const QB_ARG(x, qb::ReadRequiredInt32(ptObj, "x"));
  const QB_ARG(y, qb::ReadRequiredInt32(ptObj, "y"));

  MSG msg{hwnd, message, wParam, lParam, time, {x, y}};

  const LRESULT result = ::DispatchMessageW(&msg);

  return Napi::BigInt::New(env, result);
}

Napi::Value User32::SendMessageW(const Napi::CallbackInfo &info) {
  const Napi::Env env = info.Env();

  const QB_ARG(hWnd, qb::ReadRequiredHandle<HWND>(info, 0));
  const QB_ARG(msg, qb::ReadRequiredUint32(info, 1));
  const QB_ARG(wParam, qb::ReadRequiredUint64(info, 2));
  const QB_ARG(lParam, qb::ReadRequiredInt64(info, 3));

  const LRESULT result = ::SendMessageW(hWnd, msg, wParam, lParam);

  return Napi::BigInt::New(env, result);
}

Napi::Value User32::SendMessageA(const Napi::CallbackInfo &info) {
  const Napi::Env env = info.Env();

  const QB_ARG(hWnd, qb::ReadRequiredHandle<HWND>(info, 0));
  const QB_ARG(msg, qb::ReadRequiredUint32(info, 1));
  const QB_ARG(wParam, qb::ReadRequiredUint64(info, 2));
  const QB_ARG(lParam, qb::ReadRequiredInt64(info, 3));

  const LRESULT result = ::SendMessageA(hWnd, msg, wParam, lParam);

  return Napi::BigInt::New(env, result);
}
