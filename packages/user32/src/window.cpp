#include "user32.hpp"

static thread_local std::unique_ptr<CallbackHandler<Napi::BigInt>> wndProcCallbackHandler = nullptr;

static LRESULT CALLBACK WndProcThunk(HWND hWnd, UINT msg, WPARAM wParam, LPARAM lParam) {
  if (wndProcCallbackHandler) {
    const Napi::Env env = wndProcCallbackHandler->GetEnv();

    const auto windowHandle = Napi::BigInt::New(env, reinterpret_cast<uintptr_t>(hWnd));
    const auto message = Napi::Number::New(env, msg);
    const auto wordParam = Napi::BigInt::New(env, static_cast<uint64_t>(wParam));
    const auto longParam = Napi::BigInt::New(env, static_cast<uint64_t>(lParam));

    const Napi::BigInt result = wndProcCallbackHandler->Invoke({windowHandle, message, wordParam, longParam});

    bool lossless;
    return result.Int64Value(&lossless);
  }

  return 0;
}

Napi::Value User32::CreateWindowExW(const Napi::CallbackInfo &info) {
  const QB_ARG(dwExStyle, qb::ReadRequiredUint32(info, 0));
  const QB_ARG(lpClassName, qb::ReadOptionalWideString(info, 1));
  const QB_ARG(lpWindowName, qb::ReadOptionalWideString(info, 2));
  const QB_ARG(dwStyle, qb::ReadRequiredUint32(info, 3));
  const QB_ARG(X, qb::ReadRequiredInt32(info, 4));
  const QB_ARG(Y, qb::ReadRequiredInt32(info, 5));
  const QB_ARG(nWidth, qb::ReadRequiredInt32(info, 6));
  const QB_ARG(nHeight, qb::ReadRequiredInt32(info, 7));
  const QB_ARG(hWndParent, qb::ReadOptionalHandle<HWND>(info, 8));
  const QB_ARG(hMenu, qb::ReadOptionalHandle<HMENU>(info, 9));
  const QB_ARG(hInstance, qb::ReadOptionalHandle<HINSTANCE>(info, 10));
  const QB_ARG(lpParam, qb::ReadOptionalHandle<LPVOID>(info, 11));

  const HWND hWnd = ::CreateWindowExW(dwExStyle,
                                      lpClassName ? lpClassName->c_str() : nullptr,
                                      lpWindowName ? lpWindowName->c_str() : nullptr,
                                      dwStyle,
                                      X,
                                      Y,
                                      nWidth,
                                      nHeight,
                                      hWndParent ? hWndParent.value() : nullptr,
                                      hMenu ? hMenu.value() : nullptr,
                                      hInstance ? hInstance.value() : nullptr,
                                      lpParam ? lpParam.value() : nullptr);

  return qb::HandleToBigInt(info, hWnd);
}

Napi::Value User32::RegisterClassExW(const Napi::CallbackInfo &info) {
  const Napi::Env env = info.Env();

  const QB_ARG(params, qb::ReadRequiredObject(info, 0));

  const QB_ARG(cbSize, qb::ReadRequiredUint32(params, "cbSize"));
  const QB_ARG(style, qb::ReadRequiredUint32(params, "style"));
  const QB_ARG(lpfnWndProc, qb::ReadRequiredFunction(params, "lpfnWndProc"));
  const QB_ARG(cbClsExtra, qb::ReadRequiredInt32(params, "cbClsExtra"));
  const QB_ARG(cbWndExtra, qb::ReadRequiredInt32(params, "cbWndExtra"));
  const QB_ARG(hInstance, qb::ReadRequiredHandle<HINSTANCE>(params, "hInstance"));
  const QB_ARG(hIcon, qb::ReadOptionalHandle<HICON>(params, "hIcon"));
  const QB_ARG(hCursor, qb::ReadOptionalHandle<HCURSOR>(params, "hCursor"));
  const QB_ARG(hbrBackground, qb::ReadOptionalHandle<HBRUSH>(params, "hbrBackground"));
  const QB_ARG(lpszMenuName, qb::ReadOptionalWideString(params, "lpszMenuName"));
  const QB_ARG(lpszClassName, qb::ReadRequiredWideString(params, "lpszClassName"));
  const QB_ARG(hIconSm, qb::ReadOptionalHandle<HICON>(params, "hIconSm"));

  wndProcCallbackHandler = std::make_unique<CallbackHandler<Napi::BigInt>>(lpfnWndProc);

  WNDCLASSEXW wcex{};

  wcex.cbSize = cbSize;
  wcex.style = style;
  wcex.lpfnWndProc = WndProcThunk;
  wcex.cbClsExtra = cbClsExtra;
  wcex.cbWndExtra = cbWndExtra;
  wcex.hInstance = hInstance;
  wcex.lpszClassName = lpszClassName.c_str();
  QB_SET(wcex, hIcon, hIcon.value())
  QB_SET(wcex, hCursor, hCursor.value())
  QB_SET(wcex, hbrBackground, hbrBackground.value())
  QB_SET(wcex, lpszMenuName, lpszMenuName->c_str())
  QB_SET(wcex, hIconSm, hIconSm.value())

  const ATOM result = ::RegisterClassExW(&wcex);

  return Napi::Number::New(env, result);
}

Napi::Value User32::DefWindowProcW(const Napi::CallbackInfo &info) {
  const Napi::Env env = info.Env();

  const QB_ARG(hWnd, qb::ReadRequiredHandle<HWND>(info, 0));
  const QB_ARG(msg, qb::ReadRequiredUint32(info, 1));
  const QB_ARG(wParam, qb::ReadRequiredUint64(info, 2));
  const QB_ARG(lParam, qb::ReadRequiredInt64(info, 3));

  const LRESULT result = ::DefWindowProcW(hWnd, msg, wParam, lParam);

  return Napi::BigInt::New(env, result);
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

Napi::Value User32::ShowWindow(const Napi::CallbackInfo &info) {
  const Napi::Env env = info.Env();

  const QB_ARG(hWnd, qb::ReadRequiredHandle<HWND>(info, 0));
  const QB_ARG(nCmdShow, qb::ReadRequiredInt32(info, 1));

  const BOOL result = ::ShowWindow(hWnd, nCmdShow);

  return Napi::Boolean::New(env, result);
}

Napi::Value User32::UpdateWindow(const Napi::CallbackInfo &info) {
  const Napi::Env env = info.Env();

  const QB_ARG(hWnd, qb::ReadRequiredHandle<HWND>(info, 0));

  const BOOL result = ::UpdateWindow(hWnd);

  return Napi::Boolean::New(env, result);
}
