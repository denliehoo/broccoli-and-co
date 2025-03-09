#!/bin/bash

# Run tests
if ! jest; then
  echo "Tests failed, unable to build"
  exit 1
fi

echo "Tests passed, starting build process..."
next build
echo "Build success!"
