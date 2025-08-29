#pragma once

#include <napi.h>
#include <windows.h>

class CallbackHandler
{
public:
    explicit CallbackHandler(const Napi::Env env, const Napi::Function &fn) : callback(Napi::Persistent(fn)), env(env) {}

    void Invoke(Napi::Value &arg) const
    {
        Napi::HandleScope scope(env);
        this->callback.Call({arg});
    }

    void Invoke(std::initializer_list<napi_value> values) const
    {
        Napi::HandleScope scope(env);
        this->callback.Call(values);
    }

    Napi::Env GetEnv() const
    {
        return this->env;
    }

private:
    Napi::FunctionReference callback;
    Napi::Env env;
};
