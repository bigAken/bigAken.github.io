# Github ssh-keygen ed25519 以及 ssh agent 使用

[About SSH key generation](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#adding-your-ssh-key-to-the-ssh-agent)

## ssh-key ed25519 生成步骤

1. 打开 git bash

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

2. 看到如下提示时

```text
Enter a file in which to save the key (/Users/you/.ssh/id_rsa): [Press enter]
```

按下回车，表示把 ssh key 放在默认地址

3. 设置 ssh key 密码

```text
Enter passphrase (empty for no passphrase): [Type a passphrase]
Enter same passphrase again: [Type passphrase again]
```

4. 启动 ssh agent

```bash
eval "$(ssh-agent -s)"
```

5. 使用如下指令把 ssh key 添加到 ssh-agent 中：

```bash
ssh-add ~/.ssh/id_ed25519
```

6. 打开 GitHub 登录 并且添加你的 SSH keys

## ssh agent 使用

### 连接 ssh agent(git bash 中使用该命令)

测试 ssh agent 是否连接成功(git bash 中使用该命令)

```bash
ssh -T git@github.com
```

如果你看到一下信息,则表示 ssh 连接成功了

```text
Hi username! You've successfully authenticated, but GitHub does not provide shell access
```

### ssh-agent 启用 (git bash 中使用该命令)

```bash
eval "$(ssh-agent -s)"
```

### windows 杀进程（powershell 中使用）

ssh agent 使用完毕应该关闭该进程
查看进程以及 pid

```bash
tasklist
```

通过 pid 关闭进程

```bash
taskkill /pid PID /F
```
