<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [TROUBLESHOOT](#troubleshoot)
  - [Development](#development)
    - [Limit of file watchers reached](#limit-of-file-watchers-reached)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# TROUBLESHOOT

## Development

### Limit of file watchers reached

Error: ENOSPC: System limit for number of file watchers reached
[Stackoverflow answer](https://stackoverflow.com/questions/55763428/react-native-error-enospc-system-limit-for-number-of-file-watchers-reached)

```
# insert the new value into the system config
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

# check that the new value was applied
cat /proc/sys/fs/inotify/max_user_watches

# config variable name (not runnable)
fs.inotify.max_user_watches=524288
```
