#include "comctl32.hpp"

Napi::Object Initialize(const Napi::Env env, Napi::Object exports)
{
  return exports;
}

NODE_API_MODULE(comctl32, Initialize)
