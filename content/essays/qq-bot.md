---
title: "配置 QQ bot"
description: "从 NapCat、OneBot 到 AstrBot，记一次不太顺利的 QQ 机器人开发"
date: 2026-10-22
status: public
kind: tech
tags: ["技术", "AstrBot", "NapCat"]
---
*本文存在人工智能参与，具体用作结构构思和代码检索。本文语言均已通过真人审查与润色。*

我觉得拥有一个bot是很酷的一件事，尤其是我做自己的 Group Brief 项目了解到了napcat之后，我觉得这是一个极好的工具，可以用来搭建一个bot玩玩。

但是显然没那么容易，看起来用别人造好的轮子就可以完成的工作我也是遇到了不少困难，并且时至今日我也还没有完全搞懂一些具体的原理和机制。但是显然很有意思，这也是我从小就很想要的，于是我打算把这配置过程记录下来，也方便我进一步的挖掘学习。

这也是我的第一个技术类型的博客。在技术方面我还有太多不懂，很难说去教别人什么，把自己走过的路 试过的错 做过的事像这样记录下来倒也挺好。

## 配置 NapCat

第一版采用的是 [NapCat](https://github.com/NapNeko/NapCatQQ) 和 [OneBot 11](https://github.com/botuniverse/onebot-11)。简单来说，NapCat 负责获取和发送QQ消息，OneBot定义消息的格式和收发接口。

下载[NapCatDesktop](https://github.com/NapNeko/NapCatQQ-Desktop)之后，创建一个bot实例。登上小号之后，在WebUI里面继续完成相关配置

我们选择启用一个WebSocket服务端，Host填127.0.0.1，端口暂定3001，选择`array`的消息格式，关闭自身消息上报。

这样以后，就可以开始测试我们的bot和NapCat的连接了。`bot.py`尝试连接到NapCat，从而NapCat得以把相应的QQ消息转发给我们的bot程序。

连上之后，把收到的每条消息看成一个事件 `event`。

```python
async with connect(WS_URL, additional_headers=build_headers()) as ws:
    async for raw in ws:
        try:
            event = json.loads(raw)
        except json.JSONDecodeError:
            continue
        await handle_event(ws, event)
```

从WebSocket读到JSON之后，解析出发言人、群号和消息内容，判断要不要回复。如果要回复，向OneBot 发送一个action：

```python
await send_action(
    ws,
    "send_group_msg",
    {"group_id": group_id, "message": text},
)
```

初步设定是只有at的消息才会回复。

## NapCat 的陨落

时间来到9月4号，登录 NapCat 的小号被要求重新认证了。要认证，必须用国家网络安全认证的app。为了这个我专门下载了，发现要领取网证才能继续下一步。点进去领取网证，必须要用NFC扫身份证，时处工位的我手上并没有此物，得回宿舍才能弄。许多次回宿舍忘记了这档事的我甚至专门写到了文件传输助手里面提醒我，终于我想起来这件事了，却发现我的手机扫不上身份证，不知是手机问题或是软件问题。

总之，可以宣布小号陨落了。

后来加了NapCat的qq群，看来这并不是罕见的事，并且新建的号很有可能被盯上，更何况Napcat好像蛮久以前就受到很多官方的关注了。

好在数日之后我在Napcat的页面我找到了 AstrBot，于是本打算搁置的bot计划又得以复活。

## AstrBot阶段

**QQ 官方 Bot + [AstrBot](https://github.com/AstrBotDevs/AstrBot)**。

换了官方机器人，那么就没办法封控我了

### 配置AstrBot
在 QQ 开放平台创建官方机器人，拿到 AppID 和 AppSecret之后，在AstrBot的 WebUI 里添加相应的信息。

从配置角度来看，AstrBot似乎完胜NapCat..? 并且不会被封号..

### 如何唤醒？

如果每次都要 `@紫ちゃん`，感觉有点麻烦，而且感觉就像是换了个对话框跟ai聊天，而不是在和真人对话

所以我打算叫名字就可以唤醒，然后吸收一定长度的上下文作为提示词

这是有难度的一件事

- “小紫帮我看看这个”——显然是在叫它
- “小紫昨天说的有道理”——只是在谈论它
- “这个紫色也太好看了”——压根就没叫它

如果简单判断 `"紫" in text`，这显然是不对的。把消息粗分为 `DIRECT`、`AMBIGUOUS` 和 `NONE`：明显的称呼直接唤醒，明显无关的词直接排除，含糊的语句交给轻量模型结合上下文判断。


```python
compounds = r"(紫(?:色|菜|外线|外套|砂|薯|苏|罗兰|荆|金|红|蓝|黑|光))"
if re.match(compounds, raw):
    return "NONE"

match = re.match(r"(小紫酱|紫酱|小紫|阿紫|yukari|紫)", raw, re.I)
```


### 什么时候回复？

我们聊天的时候通常不会在一个消息里面打一段太长的话，而是会分好几个消息来表达一个完整的话（至少很多人会这样做）。

因此不能只把一个消息传给LLM，做一些组合是很有必要的。

如果紫判断这个时候要接话，那么为了防止短时间内有多条消息，启用一个等待。我把等待时间设成了 3 秒，实际上会在 1.8～3 秒之间随机等待（但是为什么要这样随机..）。如果这时群里又发来了新消息，就一起打包，再重新开始等待。

```json
{
  "enable_debounced_active_reply": true,
  "active_reply_debounce_seconds": 3.0
}
```

用递增的 `generation` 版本号判断这个任务是否已经过时：

```python
async def on_group_message(group_id, message):
    recent_messages[group_id].append(message)
    generation[group_id] += 1
    my_generation = generation[group_id]
    await asyncio.sleep(3)
    # 如果有新消息到来，因为版本号不同，旧任务退出
    if my_generation != generation[group_id]:
        return
```

把这些消息打包之后，丢给轻量模型判断要不要接话。确认需要回复以后，进入下一步发给LLM。

如果某条消息出现了单独的@而没有其他文字，那么bot会在一定时间窗口内寻找同一个发送者的上一条消息。但是实际情况里不一定是同一个发送者，所以这一点还有待完善。

### 图片识别

这是我群群友`小镜容易寂寞，说不定是只小兔子哦`最想要的功能（我评的）。

这功能准确率很低，最奇怪的地方莫过于，按道理来讲我使用的上游模型是`DeepSeek V4.1 Flash`，which 显然具有多模态能力。我将图片直接拿去问deepseek，能够得到正确答案。

那么问题出在联网搜索？

加了联网搜索之后，bot倾向于给出一个答案了，而不是输出我不知道。但是他输出的是错误答案。

## 结语

截至这篇文章更新时，识图仍然悬而未决。在我的任务处理的优先序列中，小紫已经慢慢的排在了后面。只恨每天没有48个小时，只恨这大学还是有太多别的事要做，只恨人类没有无限的时间和精力，而我也经常被别的事务所勾走注意力。

显然，Attention is all I need! 待我有此闲心之时，租一个服务器来给小紫一个长久一些的家吧。这也是我的第一个技术向的博客，没有什么技术含量，只是记录一下和gpt一起创造小紫的过程，也许经过我的努力小紫会越来越像人，也许图恒宇的设想，在遥远的将来能够实现。