module.exports = {
  apps: [
    {
      name: "komoot-map",
      script: "/home/jonas/komoot-map/venv/bin/gunicorn",
      args: "-c gunicorn.conf.py src.api.server:app",
      cwd: "/home/jonas/komoot-map/backend",
      interpreter: "none",
      env: {
        PATH: "/home/jonas/komoot-map/venv/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
        KOMOOT_USER_ID: "94026207184",
      },
      restart_delay: 10000,
      autorestart: true,
      watch: false,
    },
  ],
};
