#pragma once

#include <napi.h>

template <typename T> class CallbackHandler {
public:
  // TODO: Might wanna switch to Napi::ThreadSafeFunction if we ever need to call from worker threads
  explicit CallbackHandler(const Napi::Function &fn) : callback(Napi::Persistent(fn)) {}
  ~CallbackHandler() { this->callback.Reset(); }

  CallbackHandler(const CallbackHandler &) = delete;
  CallbackHandler &operator=(const CallbackHandler &) = delete;

  CallbackHandler(CallbackHandler &&) = default;
  CallbackHandler &operator=(CallbackHandler &&) = default;

  T Invoke(const Napi::Value &arg) const {
    Napi::HandleScope scope(this->GetEnv());
    return this->callback.Call({arg}).As<T>();
  }

  T Invoke(const std::initializer_list<napi_value> values) const {
    Napi::HandleScope scope(this->GetEnv());
    return this->callback.Call(values).As<T>();
  }

  Napi::Env GetEnv() const { return this->callback.Env(); }

private:
  Napi::FunctionReference callback;
};
