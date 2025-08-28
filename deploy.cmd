@echo off

:: ----------------------
:: KUDU Deployment Script
:: Version: 1.0.0
:: ----------------------

:: Prerequisites
:: -------------
:: Verify node.js installed
where node 2>nul >nul
IF %ERRORLEVEL% NEQ 0 (
  echo Missing node.js executable, please install node.js, if already installed make sure it can be reached from current environment.
  goto error
)

:: Setup
:: -----
setlocal enabledelayedexpansion

SET ARTIFACTS=%~dp0%..\artifacts

IF NOT DEFINED DEPLOYMENT_SOURCE (
  SET DEPLOYMENT_SOURCE=%~dp0%.
)

IF NOT DEFINED DEPLOYMENT_TARGET (
  SET DEPLOYMENT_TARGET=%ARTIFACTS%\wwwroot
)

IF NOT DEFINED NEXT_MANIFEST_PATH (
  SET NEXT_MANIFEST_PATH=%ARTIFACTS%\manifest

  IF NOT DEFINED PREVIOUS_MANIFEST_PATH (
    SET PREVIOUS_MANIFEST_PATH=%ARTIFACTS%\manifest
  )
)

IF NOT DEFINED KUDU_SYNC_CMD (
  :: Install kudu sync
  echo Installing Kudu Sync
  call npm install kudusync -g --silent
  IF !ERRORLEVEL! NEQ 0 goto error

  :: Locally just running "kuduSync" would also work
  SET KUDU_SYNC_CMD=%appdata%\npm\kuduSync.cmd
)

::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
:: Deployment
:: ----------

echo Handling node.js deployment.

:: 1. Install client dependencies
pushd "%DEPLOYMENT_SOURCE%\client"
call npm install --production=false
IF !ERRORLEVEL! NEQ 0 goto error
popd

:: 2. Build React client
pushd "%DEPLOYMENT_SOURCE%\client"
call npm run build
IF !ERRORLEVEL! NEQ 0 goto error
popd

:: 3. Install server dependencies
pushd "%DEPLOYMENT_SOURCE%\server"
call npm install --production=true
IF !ERRORLEVEL! NEQ 0 goto error
popd

:: 4. Build TypeScript server
pushd "%DEPLOYMENT_SOURCE%\server"
call npm run build
IF !ERRORLEVEL! NEQ 0 goto error
popd

:: 5. Copy server files to deployment target
IF EXIST "%DEPLOYMENT_TARGET%" rmdir /s /q "%DEPLOYMENT_TARGET%"
mkdir "%DEPLOYMENT_TARGET%"

xcopy /s /y "%DEPLOYMENT_SOURCE%\server\dist\*" "%DEPLOYMENT_TARGET%\"
xcopy /s /y "%DEPLOYMENT_SOURCE%\server\node_modules\*" "%DEPLOYMENT_TARGET%\node_modules\"
xcopy /s /y "%DEPLOYMENT_SOURCE%\server\package.json" "%DEPLOYMENT_TARGET%\"

:: 6. Copy client build to server
mkdir "%DEPLOYMENT_TARGET%\client\build"
xcopy /s /y "%DEPLOYMENT_SOURCE%\client\build\*" "%DEPLOYMENT_TARGET%\client\build\"

:: 7. Copy web.config for IIS
copy "%DEPLOYMENT_SOURCE%\web.config" "%DEPLOYMENT_TARGET%\web.config"

echo Deployment completed successfully.
goto end

:: Execute command
:error
echo An error has occurred during deployment.
call :exitSetErrorLevel
call :exitFromFunction 2>nul

:exitSetErrorLevel
exit /b 1

:exitFromFunction
()

:end
endlocal
echo Finished successfully.