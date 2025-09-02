#pragma once

#include <napi.h>
#include <windows.h>

template <typename T> class CallbackHandler {
public:
  explicit CallbackHandler(const Napi::Env env, const Napi::Function &fn) : callback(Napi::Persistent(fn)), env(env) {}

  T Invoke(Napi::Value &arg) const {
    Napi::HandleScope scope(env);
    return this->callback.Call({arg}).As<T>();
  }

  T Invoke(std::initializer_list<napi_value> values) const {
    Napi::HandleScope scope(env);
    return this->callback.Call(values).As<T>();
  }

  Napi::Env GetEnv() const { return this->env; }

private:
  Napi::FunctionReference callback;
  Napi::Env env;
};
