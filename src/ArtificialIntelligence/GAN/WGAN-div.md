---
title: Wasserstein Divergence for GANs
date: 2021-05-18 15:41:52
author: Breeze Shane
top: false
image: /images/wgan-div.jpg
toc: true
mathjax: true
category: 
 - UnsupervisedLearning
 - GenerativeAdversarialNetworks
tag: 
 - Unsupervised Learning
 - Generative Adversarial Networks
 - Wasserstein GAN
excerpt: 本篇文章记述WGAN-div的原理及其实现。鉴于本人所学过于匮乏「尤其是数学方面」，太多东西理解不了，因此作此篇一来初步学习，二来留给以后的自己去解决。另外，也正因上述原因，本篇博客并不具备参考意义。
---

# Wasserstein Divergence for GANs

> 參考自：
>
> [WGAN-div：一个默默无闻的WGAN填坑者](https://spaces.ac.cn/archives/6139)
>
> [Wasserstein Divergence for GANs](https://arxiv.org/abs/1712.01026)

## 为什么还要有WGAN-div？

尽管看起来WGAN-gp已无可挑剔，但应该看出来到底它还是有缺陷的。回看之前的WGAN-gp，你会发现它的梯度非常不稳定，总是上下大幅度波动。

我们来回顾一下WGAN和WGAN-GP对权重矩阵的处理：

WGAN采用的措施是裁剪权重，即将每一个权重都裁剪到$[-c,c]$的范围内，其中$c$是自由设定的常数。但这个做法是非常朴素的做法，而且经过实验发现表现的性能并不太令人满意，所以现在也基本上不用了。

WGAN-GP采用的措施是梯度惩罚，通过给判别器梯度增加惩罚来限制判别器的学习能力，避免判别器训练过强的情况。由于$||T||_L\leq1$可以由$||\nabla T||\leq1$保证，因此提出了相应的损失函数：
$$
W(P_r, P_g)=\max_{D} \{E_{x \sim P_r}[D(x)]-E_{x\sim P_g(x)}[D(x)]-\lambda E_{x\sim P_{input}(x)}[(||\nabla_x D(x)||-1)^2] \}
$$
但我们要求$||T||_L\leq1$在每一处都成立，因此真实分布应当是全空间的均匀分布，但这很难做到。不过作者也采取了一种做法：在真假样本之间随机插值来惩罚。这样就可以保证真假样本之间的过渡区域满足Lipschitz约束。这种思路非常直接，但它是一种经验方案，并没有更完备的理论支撑。而WGAN-div论文指出这一公式不总是有梯度。「具体情况可以直接去论文内翻看，日后我理解明白了再在这里写出来。」

在这样的情况下，W散度就被提了出来，可以去掉Lipschitz约束条件，还保留了Wasserstein距离的良好性质。

另外，值得一提的是WGAN衍生版本中，WGAN-div的数学理论支撑是最完备的。论文很值得一读，如果有时间，最好推导一下作者的数学论证。

## WGAN-div的理论依据是什么？

作者提出了一种方案，将判别器的表达式推导出来：
$$
T^*=\underset{T}{\argmax}\mathbb{E}_{x\sim P_r}[T(x)]-\mathbb{E}_{x\sim P_g}[T(x)]-{1\over2}\mathbb{E}_{x\sim r(x)}[||\nabla T||^2]
$$
接着推导了生成器的Loss表达式：
$$
\underset{G}{\argmin}\mathbb{E}_{x\sim P_r}[T^*(x)]-\mathbb{E}_{z\sim P_g}[T^*(G(z))]
$$
目标函数也随之而确定下来：
$$
W_{k,p}[P_r,P_g]=\max_T\mathbb{E}_{x\sim P_r}[T(x)]-\mathbb{E}_{x\sim P_g}[T(x)]-k\mathbb{E}_{x\sim r(x)}[||\nabla T||^p]
$$
其中$k>0,p>1$。

1. $W_{k,p}$是个对称的散度。散度的意思是：$D[P,Q]≥0$且$D[P,Q]=0⇔P=Q$，它跟“距离”的差别是它不一定满足三角不等式，也有叫做“半度量”、“半距离”的。$W_{k,p}$是一个散度，这已经非常棒了，因为我们大多数GAN都只是在优化某个散度而已。散度意味着当我们最小化它时，我们真正是在缩小两个分布的距离。
2. $W_{k,p}$的最优解跟$W$距离有一定的联系。判别器公式$T^*$就是一个特殊的$W_{\frac{1}{2},2}$。这说明当我们最大化$W_{k,p}$得到$\mathbb T$之后，可以去掉梯度项，通过最小化生成器损失函数来训练生成器。这也表明以$W_{k,p}$为目标，性质跟$W$距离类似，不会有梯度消失的问题。
3. 作者证明了$\underset{T}{\max}\, \mathbb{E}_{x∼P_r}[T(x)]-\mathbb{E}_{x∼P_g}[T(x)]-k\mathbb{E}_{x∼r(x)}[(||∇T||-n)^p]$不总是一个散度。当$n=1,p=2$时就是WGAN-GP的梯度惩罚，作者说它不是一个散度。不是散度意味着WGAN-GP在训练判别器的时候，并非总是会在拉大两个分布的距离（鉴别者在偷懒，没有好好提升自己的鉴别技能），从而使得训练生成器时回传的梯度不准。

## GAN-div将如何实现？

我们再回顾一下判别器和生成器的损失函数：
$$
\begin{aligned}
T&=\underset{T}{\argmax}\mathbb{E}_{x\sim P_r}[T(x)]-\mathbb{E}_{x\sim P_g}[T(x)]-k\mathbb{E}_{x\sim r(x)}[||\nabla T||^p]  \\
G&=\underset{G}{\argmin}\mathbb{E}_{x\sim P_r}[T(x)]-\mathbb{E}_{z\sim P_g}[T(G(z))]
\end{aligned}
$$
<table><font color="#30dff3" size=4>由于目前本人的所学有限，水平不足，暂时还不会写残差和卷积网络，所以论文原本使用的残差和卷积我都直接使用了线性神经网络来代替「沿用了WGAN的网络结构」，虽然一样可以完成任务，但付出的时间代价很大。另外，我写的代码一来是在原来WGAN的基础上做的改动，二来是使用WGAN-div来模拟高斯分布。不得不说的是，本来我想~~勤奋~~偷懒去寻找现成的源代码，然而我发现，一个是使用Keras实现的，另一个虽然是Pytorch实现但是是处理图像的，差别还是蛮大的，所以我只好直接翻看论文来复现了，在这里真的要感谢大神Jiqing Wu，给出了足够详细的算法步骤！</font></table>

前面的代码和Original GAN一样，几无差别，而在绘制图像这个函数的后面需要再接着写：

```python
def weights_init(m):
    if isinstance(m, nn.Linear):
        # m.weight.data.normal_(0.0, 0.02)
        nn.init.kaiming_normal_(m.weight)
        m.bias.data.fill_(0)
```

这个用来初始化网络结构的权重矩阵。

接着这里我反复琢磨、理解论文，然后写出了这个惩罚项：

```python
def gradient_penalty(D, x_r, x_f, p):
    t = torch.rand(batchsz, 1).cuda()
    t = t.expand_as(x_r)

    x_hat = (1 - t) * x_r + t * x_f
    x_hat.requires_grad_(True)

    pred = D(x_hat)
    grads = autograd.grad(outputs=pred,
                          inputs=x_hat,
                          grad_outputs=torch.ones_like(pred),
                          create_graph=True,
                          retain_graph=True,
                          only_inputs=True)[0]
    gp = torch.pow(torch.square(grads), p/2)
    return gp.mean()
```

接着在main主函数里，我做的改动还是蛮大的，不过也是严格按照论文所说去做，实现的代码如下：

```python
def main():
    k = 2
    p = 6
    torch.manual_seed(23)
    np.random.seed(23)

    data_iter = data_generator()
    x = next(data_iter)
    G = Generator().cuda()
    G.apply(weights_init)
    D = Discriminator().cuda()
    D.apply(weights_init)
    optim_G = optim.Adam(G.parameters(), lr=5e-6, betas=(0.5, 0.9))
    optim_D = optim.Adam(D.parameters(), lr=5e-6, betas=(0.5, 0.9))

    print('batch:', next(data_iter).shape)

    viz.line([[0, 0]], [0], win='loss', opts=dict(title='loss', legend=['D', 'G']))

    for epoch in range(50000):

        for _ in range(15):
            x_r = next(data_iter)
            x_r = torch.from_numpy(x_r).cuda()
            pred_r = D(x_r)
            loss_r = pred_r.mean()

            z = torch.randn(batchsz, 2).cuda()
            x_f = G(z).detach()
            pred_f = D(x_f)
            loss_f = pred_f.mean()

            gp = gradient_penalty(D, x_r, x_f, p)
            loss_D = loss_r - loss_f + k * gp # 论文给出的公式如此

            optim_D.zero_grad()
            loss_D.backward()
            optim_D.step()

        z = torch.randn(batchsz, 2).cuda()
        x_fake = G(z)
        pred_fake = D(x_fake)
        loss_G = pred_fake.mean() # 论文给出的公式亦如此

        optim_G.zero_grad()
        loss_G.backward()
        optim_G.step()

        if epoch % 10 == 0:
            viz.line([[loss_D.item(), loss_G.item()]], [epoch], win='loss', update='append')
            generate_image(D, G, x_r, epoch)
            print(loss_D.item(), loss_G.item())
```

最后再直接执行主函数调用一下就可以了：

```python
if __name__ == '__main__':
    main()
```

最终的实现效果如图：

![](/images/WGAN-div-1.png)

## “睿智”作者的话（不重要）

这花了我三四天的功夫，终于是改完了这一堆bug，都不知道经历了多少辛酸，真是一言难尽……不过这是我尝试复现并获得成功的第一篇论文，心里还是蛮自豪的，之前遭的罪吃的苦也就不算什么了！只希望往后继续学习的话会顺利一些吧！
