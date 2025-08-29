#pragma once

#include <string_view>

namespace _detail
{
  consteval std::string_view UnqualifiedName(std::string_view name)
  {
    const size_t pos = name.rfind("::");
    return pos == std::string_view::npos ? name : name.substr(pos + 2);
  }
}

#define EXPORT(function)                                                   \
  {                                                                        \
    constexpr std::string_view name = _detail::UnqualifiedName(#function); \
    exports.Set(Napi::String::New(env, name.data(), name.size()),          \
                Napi::Function::New(env, function, std::string(name)));    \
  }

#define ARG(variable, expression)      \
  auto variable = expression;          \
  if (info.Env().IsExceptionPending()) \
  {                                    \
    return info.Env().Undefined();     \
  }

#define SET(struct, optional, expression) \
  if (optional.has_value())               \
  {                                       \
    struct.optional = expression;         \
  }
