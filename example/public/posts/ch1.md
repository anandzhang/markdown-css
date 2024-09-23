# 离散时间信号和系统

## 离散时间信号

离散时间信号通常用**序列**表示。可以通过连续时间信号采样得到离散时间信号。
等间隔采样：$x(T) = x_a(nT)$，其中$T$为采样周期，$n$为整数，$f_s = \frac{1}{T}$为采样频率。

### 常见的离散时间信号

- 单位冲激序列：$x(n) = \delta(n)$
- 单位阶跃序列：$x(n) = u(n)$，**本书中采用 $u(n)$ 表示，而非《信号与系统》中的$\epsilon(n)$**。

- 矩形序列：0 ～ N-1 为 1，其余为 0 的序列。

- 实指数序列
- 复指数序列: $x(n) = r^n e^{j \omega_0 n}$
- 正弦序列： $x(n) = \sin(\omega_0 n)$

离散周期序列中，周期必定是整数周期。例如：
$ \sin{\frac{16\pi n}{5}}$ 的周期就是 5，而非 5/8.

### 序列的运算

1. 序列的相加、相乘（**逐项相乘**，线性卷积算法中，频域序列相乘即为如此）

2. 序列的移位

3. 序列的能量：$S = \frac{1}{2}\sum_{n=-\infty}^{\infty}|x(n)|^2$

   - 若$S \lt \infty$，则称序列为平方可和序列。
   - 若$\sum_{n=-\infty}^{\infty}|x(n)| \lt \infty$，则称序列为绝对可和序列。
   - 有界序列：$|x(n)| \leq M$，则称序列为有界序列。

4. 任意一个序列都可以分解成一个偶对称序列和一个奇对称序列的和。

5. 任意一个序列都可以表示为单位移位序列的**加权和**。

## 离散信号的 Fourier 变换和 z 变换

### DTFT

- $X(e^{j\omega}) = \sum_{n=-\infty}^{\infty} x(n) e^{-j\omega n}$
- 是以$2\pi$为周期的函数。
- 一个序列拥有 DTFT 的条件：**序列是绝对可和的**。因此有限长序列的 DTFT 总是存在。
- $\omega$ ： 频率对采样频率作归一化后的角频率，满足$\frac{\omega}{2\pi} = \frac{f}{f_s}$。
- IDTFT: $x(n) = \frac{1}{2\pi} \int_{-\pi}^{\pi} X(e^{j\omega}) e^{j\omega n} d\omega$，序列的 DTFT 和 IDTFT 互为逆变换。

### z 变换

- $X(z) = \sum_{n=-\infty}^{\infty} x(n) z^{-n}$
- 拥有收敛域。和**连续时间系统**的 Laplace 变换类似，但后者的收敛域是一个平面，如虚轴左侧；前者的收敛域一般以圆为分界。
- **常用 z 变换**：
  | 序列 | z 变换 | 收敛域 |
  | :-------------------: | :------------------------------------: | :------------------: |
  | $a^n u(n)$ | $\frac{z}{z-a}$ | $\|z\| \gt \|a\|$ |
  | $u(n)$ | $\frac{z}{z-1}$ | $\|z\| \gt 1$ |
  | $n u(n)$ | $\frac{z}{(z-1)^2}$ | $\|z\| \gt 1$ |
  | $-a^n u(-n-1)$ | $\frac{z}{z-a}$ | $\|z\| \lt \|a\|$ |
  | $\delta(n)$ | $1$ | 所有 $z$ |
  | $\delta(n-k)$ | $z^{-k}$ | 所有 $z$ |
  | $n^2 u(n)$ | $\frac{z(z+1)}{(z-1)^3}$ | $\|z\| \gt 1$ |
  | $\cos(\omega n) u(n)$| $\frac{z(z-\cos\omega)}{z^2 - 2\cos\omega z + 1}$ | $\|z\| \gt 1$ |
  | $\sin(\omega n) u(n)$| $\frac{z\sin\omega}{z^2 - 2\cos\omega z + 1}$ | $\|z\| \gt 1$ |
- 反 z 变换
  - 部分分式分解（乘一个 z\*1/z）
  - 留数法

### z 变换 和 DTFT 之间的关系

- 当$z = e^{j\omega_0}$时，$X(z) = X(e^{j\omega_0})$。采样序列单位圆上的 z 变换和 DTFT 相同。
- z 平面单位圆上的一周正好是 DTFT 周期。

### Parseval Theorem

- t-domain 中算出的能量 和 f-domain 中算出的能量相同。即： $\sum_{n=-\infty}^{\infty}|x(n)|^2 = \frac{1}{2\pi} \int_{-\pi}^{\pi} |X(e^{j\omega})|^2 d\omega$

## 离散时间系统

- 线性、时变的概念
- 对于 LTI 系统：**输入信号与系统单位脉冲响应的卷积**构成输出信号。在离散系统下，这种卷积叫作**线性卷积**。
- MATLAB 实现

  ```matlab
  y=conv(u,h);
  M=length(y)-1;
  n=0:M;
  stem(n,y);
  ```