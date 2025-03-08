#!/bin/bash

# Run tests
if ! jest; then
  echo "Tests failed, unable to build"
  exit 1
fi

# Run the build if tests pass
next build
echo "Build success!"
