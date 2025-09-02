{
  "targets": [
    {
      "target_name": "comctl32",
      "sources": [
        "<!@(node ../../scripts/list-source-files.js)"
      ],
      "include_dirs": [
        "<!(node -p \"require('node-addon-api').include\")"
      ],
      "dependencies": [
        "<!(node -p \"require('node-addon-api').targets\"):node_addon_api"
      ],
      "cflags": [
        "-fno-exceptions"
      ],
      "cflags_cc": [
        "-fno-exceptions"
      ],
      "msvs_settings": {
        "VCCLCompilerTool": {
          "AdditionalOptions": [
            "/Zc:__cplusplus",
            "/std:c++20"
          ]
        }
      }
    }
  ]
}
