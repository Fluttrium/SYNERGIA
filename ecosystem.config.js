module.exports = {
  apps: [
    {
      name: "build-script",
      script: "node_modules/.bin/next",
      args: "build",
      cwd: "/var/www/SYNERGIA",
      env: {
        NODE_ENV: "production",
      },
      instances: 1,
      autorestart: false,
      watch: false,
    },
    {
      name: "nextjs-app",
      script: "node_modules/.bin/next",
      args: "start",
      cwd: "/var/www/SYNERGIA",
      env: {
        NODE_ENV: "production",
      },
      instances: 1,
      autorestart: true,
      watch: false,
    },
  ],
};
