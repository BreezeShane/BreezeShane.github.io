import{_ as i,W as p,X as l,Y as s,Z as n,$ as e,a1 as t,C as o}from"./framework-68a75bb9.js";const c={},r=s("h2",{id:"opengauss下载",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#opengauss下载","aria-hidden":"true"},"#"),n(" openGauss下载")],-1),u=s("p",null,"官网至给出了CentOS和Windows系统下的安装包, 但考虑同样是Linux, openGauss也应该可以安装在Arch系上, 故有此笔记.",-1),d={href:"https://opengauss.org/zh/download.html",target:"_blank",rel:"noopener noreferrer"},b=t(`<h2 id="opengauss安装" tabindex="-1"><a class="header-anchor" href="#opengauss安装" aria-hidden="true">#</a> openGauss安装</h2><p>按照官方文档给出的, 我们执行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> ~/openGauss <span class="token operator">&amp;&amp;</span> <span class="token function">tar</span> <span class="token parameter variable">-jxf</span> openGauss-x.x.x-openEuler-64bit.tar.bz2 <span class="token parameter variable">-C</span> ~/openGauss
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">为什么不安装在/opt/openGauss下</p><p>因为<code>/opt</code>目录是归属于root用户组的, 如果安装在这里会导致一系列的权限问题, 有时连<code>chmod 777</code>也不能解决, 因此我建议避开这个问题, 直接安装到普通用户组下的目录.</p></div><p>继续执行:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> ~/openGauss/simpleInstall
<span class="token function">sh</span> install.sh  <span class="token parameter variable">-w</span>  <span class="token string">&quot;xxxx&quot;</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">source</span> ~/.bashrc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>然后这时候遇到了报错:</p><div class="hint-container danger"><p class="hint-container-title">Error</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>step <span class="token number">1</span><span class="token punctuation">]</span>: check parameter
<span class="token punctuation">[</span>step <span class="token number">2</span><span class="token punctuation">]</span>: check <span class="token function">install</span> <span class="token function">env</span> and os setting
<span class="token punctuation">[</span>step <span class="token number">3</span><span class="token punctuation">]</span>: change_gausshome_owner
<span class="token punctuation">[</span>step <span class="token number">4</span><span class="token punctuation">]</span>: <span class="token builtin class-name">set</span> environment variables

<span class="token punctuation">[</span>step <span class="token number">6</span><span class="token punctuation">]</span>: init datanode
install.sh: line <span class="token number">215</span>: gs_initdb: <span class="token builtin class-name">command</span> not found
<span class="token punctuation">[</span>step <span class="token number">7</span><span class="token punctuation">]</span>: start datanode
install.sh: line <span class="token number">221</span>: gs_ctl: <span class="token builtin class-name">command</span> not found
<span class="token function">import</span> sql <span class="token function">file</span>
Would you like to create a demo database <span class="token punctuation">(</span>yes/no<span class="token punctuation">)</span>? no
Input no, operation skip.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><p>看到<code>command not found</code>就可以知道, 这是因为系统不知道这两个程序在哪里, 解决方案自然是手动添加环境变量, 我们在<code>~/.bashrc</code>里的最后一行添加<code>export PATH=&quot;$HOME/openGauss/bin:$PATH&quot;</code>然后执行<code>source ~/.bashrc</code>更新一下. Zsh同理.</p><p>为什么会知道加这个路径能解决? 这是因为我通过执行<code>tree ./ | bat</code>后查找到这两个程序的, 然后就能顺利找到他们所在的位置.</p><p>但这还没完, 又遇到报错:</p><div class="hint-container danger"><p class="hint-container-title">Error</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>step <span class="token number">1</span><span class="token punctuation">]</span>: check parameter
<span class="token punctuation">[</span>step <span class="token number">2</span><span class="token punctuation">]</span>: check <span class="token function">install</span> <span class="token function">env</span> and os setting
<span class="token punctuation">[</span>step <span class="token number">3</span><span class="token punctuation">]</span>: change_gausshome_owner
<span class="token punctuation">[</span>step <span class="token number">4</span><span class="token punctuation">]</span>: <span class="token builtin class-name">set</span> environment variables

<span class="token punctuation">[</span>step <span class="token number">6</span><span class="token punctuation">]</span>: init datanode
gs_initdb: error <span class="token keyword">while</span> loading shared libraries: libreadline.so.6: cannot <span class="token function">open</span> shared object file: No such <span class="token function">file</span> or directory
<span class="token punctuation">[</span>step <span class="token number">7</span><span class="token punctuation">]</span>: start datanode
gs_ctl: error <span class="token keyword">while</span> loading shared libraries: libreadline.so.6: cannot <span class="token function">open</span> shared object file: No such <span class="token function">file</span> or directory
<span class="token function">import</span> sql <span class="token function">file</span>
Would you like to create a demo database <span class="token punctuation">(</span>yes/no<span class="token punctuation">)</span>? no
Input no, operation skip.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><p>经过查找资料了解到<code>libreadline.so.6</code>是位于<code>/lib/</code>目录下, 于是我执行<code>ls /lib/ | grep libreadline.so</code>来查看我当前拥有的组件:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>libreadline.so
libreadline.so.8
libreadline.so.8.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>于是我做了一个软链接来解决找不到<code>libreadline.so.6</code>的问题, 执行<code>sudo ln -s /lib/libreadline.so.8 /lib/libreadline.so.6</code>.</p><p>再次运行又遇到了报错:</p><div class="hint-container danger"><p class="hint-container-title">Error</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>step <span class="token number">1</span><span class="token punctuation">]</span>: check parameter
<span class="token punctuation">[</span>step <span class="token number">2</span><span class="token punctuation">]</span>: check <span class="token function">install</span> <span class="token function">env</span> and os setting
<span class="token punctuation">[</span>step <span class="token number">3</span><span class="token punctuation">]</span>: change_gausshome_owner
<span class="token punctuation">[</span>step <span class="token number">4</span><span class="token punctuation">]</span>: <span class="token builtin class-name">set</span> environment variables

<span class="token punctuation">[</span>step <span class="token number">6</span><span class="token punctuation">]</span>: init datanode
gs_initdb: error <span class="token keyword">while</span> loading shared libraries: libcrypt.so.1: cannot <span class="token function">open</span> shared object file: No such <span class="token function">file</span> or directory
<span class="token punctuation">[</span>step <span class="token number">7</span><span class="token punctuation">]</span>: start datanode
gs_ctl: error <span class="token keyword">while</span> loading shared libraries: libcrypt.so.1: cannot <span class="token function">open</span> shared object file: No such <span class="token function">file</span> or directory
<span class="token function">import</span> sql <span class="token function">file</span>
Would you like to create a demo database <span class="token punctuation">(</span>yes/no<span class="token punctuation">)</span>? no
Input no, operation skip.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><p>经过查询是缺少了内核<code>libxcrypt-compat</code>, 安装一下即可.</p><p>再次遇到报错:</p><div class="hint-container danger"><p class="hint-container-title">Error</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>step <span class="token number">1</span><span class="token punctuation">]</span>: check parameter
<span class="token punctuation">[</span>step <span class="token number">2</span><span class="token punctuation">]</span>: check <span class="token function">install</span> <span class="token function">env</span> and os setting
<span class="token punctuation">[</span>step <span class="token number">3</span><span class="token punctuation">]</span>: change_gausshome_owner
<span class="token punctuation">[</span>step <span class="token number">4</span><span class="token punctuation">]</span>: <span class="token builtin class-name">set</span> environment variables

<span class="token punctuation">[</span>step <span class="token number">6</span><span class="token punctuation">]</span>: init datanode
/home/breezeshane/openGauss/bin/gaussdb: error <span class="token keyword">while</span> loading shared libraries: libeSDKOBS.so: cannot <span class="token function">open</span> shared object file: No such <span class="token function">file</span> or directory
no data was returned by <span class="token builtin class-name">command</span> <span class="token string">&quot;&quot;</span>/home/breezeshane/openGauss/bin/gaussdb<span class="token string">&quot; -V&quot;</span>
The program <span class="token string">&quot;gaussdb&quot;</span> is needed by gs_initdb but was not found <span class="token keyword">in</span> the
same directory as <span class="token string">&quot;/home/breezeshane/openGauss/bin/gs_initdb&quot;</span><span class="token builtin class-name">.</span>
Check your installation.
<span class="token punctuation">[</span>step <span class="token number">7</span><span class="token punctuation">]</span>: start datanode
gs_ctl: error <span class="token keyword">while</span> loading shared libraries: libgssapi_krb5_gauss.so.2: cannot <span class="token function">open</span> shared object file: No such <span class="token function">file</span> or directory
<span class="token function">import</span> sql <span class="token function">file</span>
Would you like to create a demo database <span class="token punctuation">(</span>yes/no<span class="token punctuation">)</span>? no
Input no, operation skip.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><p>看报错是说<code>libeSDKOBS.so</code>文件找不到了, 可以确定是某环境变量缺少了这个东西的所在目录. 但我不能确定这个文件在哪, 于是先执行了<code>sudo find / -name libeSDKOBS.so</code>来查找, 然后发现:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>/home/breezeshane/OpenGauss/lib/libeSDKOBS.so
/home/breezeshane/openGauss/lib/libeSDKOBS.so
find: ‘/proc/10096/task/10096/net’: Invalid argument
find: ‘/proc/10096/net’: Invalid argument
find: ‘/proc/65449/task/65449/net’: Invalid argument
find: ‘/proc/65449/net’: Invalid argument
/run/timeshift/backup/@home/breezeshane/OpenGauss/lib/libeSDKOBS.so
/run/timeshift/backup/@home/breezeshane/openGauss/lib/libeSDKOBS.so
find: File system loop detected<span class="token punctuation">;</span> ‘/run/timeshift/backup/@’ is part of the same <span class="token function">file</span> system loop as ‘/’.
find: ‘/run/user/1000/doc’: Permission denied
find: ‘/run/user/1000/gvfs’: Permission denied
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>头两行引起了我的注意, 然后我再查看<code>LD_LIBRARY_PATH</code>环境变量<code>echo $LD_LIBRARY_PATH</code>, 果然发现它没有这个路径, 于是我手动添加了这个环境变量, 执行<code>export LD_LIBRARY_PATH=&quot;$HOME/openGauss/lib:$LD_LIBRARY_PATH&quot;</code>.</p><p>又双遇到了问题:</p><div class="hint-container danger"><p class="hint-container-title">Error</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>step <span class="token number">1</span><span class="token punctuation">]</span>: check parameter
<span class="token punctuation">[</span>step <span class="token number">2</span><span class="token punctuation">]</span>: check <span class="token function">install</span> <span class="token function">env</span> and os setting
<span class="token punctuation">[</span>step <span class="token number">3</span><span class="token punctuation">]</span>: change_gausshome_owner
<span class="token punctuation">[</span>step <span class="token number">4</span><span class="token punctuation">]</span>: <span class="token builtin class-name">set</span> environment variables

<span class="token punctuation">[</span>step <span class="token number">6</span><span class="token punctuation">]</span>: init datanode
/home/breezeshane/openGauss/bin/gaussdb: error <span class="token keyword">while</span> loading shared libraries: libncurses.so.5: cannot <span class="token function">open</span> shared object file: No such <span class="token function">file</span> or directory
no data was returned by <span class="token builtin class-name">command</span> <span class="token string">&quot;&quot;</span>/home/breezeshane/openGauss/bin/gaussdb<span class="token string">&quot; -V&quot;</span>
The program <span class="token string">&quot;gaussdb&quot;</span> is needed by gs_initdb but was not found <span class="token keyword">in</span> the
same directory as <span class="token string">&quot;/home/breezeshane/openGauss/bin/gs_initdb&quot;</span><span class="token builtin class-name">.</span>
Check your installation.
<span class="token punctuation">[</span>step <span class="token number">7</span><span class="token punctuation">]</span>: start datanode
<span class="token punctuation">[</span><span class="token number">2022</span>-03-30 <span class="token number">20</span>:53:54.259<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">100140</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span>gs_ctl<span class="token punctuation">]</span>: gs_ctl started,datadir is /home/breezeshane/openGauss/data/single_node 
<span class="token punctuation">[</span><span class="token number">2022</span>-03-30 <span class="token number">20</span>:53:54.259<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">100140</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span>gs_ctl<span class="token punctuation">]</span>: can&#39;t create lock <span class="token function">file</span> <span class="token string">&quot;/home/breezeshane/openGauss/data/single_node/pg_ctl.lock&quot;</span> <span class="token builtin class-name">:</span> No such <span class="token function">file</span> or directoryimport sql <span class="token function">file</span>
Would you like to create a demo database <span class="token punctuation">(</span>yes/no<span class="token punctuation">)</span>? no
Input no, operation skip.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><p>经过查找资料, 确认造成这个问题的原因就是在于版本滞后导致缺失运行库, 我们查看一下当前有的运行库, 执行<code>ls -1 /usr/lib/libncurses*</code>, 在这里我得到的结果是:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>/usr/lib/libncurses++.so
/usr/lib/libncurses.so
/usr/lib/libncurses++w_g.a
/usr/lib/libncursesw_g.a
/usr/lib/libncurses++w.so
/usr/lib/libncursesw.so
/usr/lib/libncurses++w.so.6
/usr/lib/libncursesw.so.6
/usr/lib/libncurses++w.so.6.3
/usr/lib/libncursesw.so.6.3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着我们执行</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">ln</span> <span class="token parameter variable">-s</span> /usr/lib/libncursesw.so.6 /usr/lib/libncurses.so.5
<span class="token function">sudo</span> <span class="token function">ln</span> <span class="token parameter variable">-s</span> /usr/lib/libncursesw.so.6 /usr/lib/libtinfo.so.5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>即可解决这个问题.</p><p>最后重新执行即可大功告成, 以下是当时输出的信息:</p><details class="hint-container details"><summary>Info</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>step <span class="token number">1</span><span class="token punctuation">]</span>: check parameter
<span class="token punctuation">[</span>step <span class="token number">2</span><span class="token punctuation">]</span>: check <span class="token function">install</span> <span class="token function">env</span> and os setting
<span class="token punctuation">[</span>step <span class="token number">3</span><span class="token punctuation">]</span>: change_gausshome_owner
<span class="token punctuation">[</span>step <span class="token number">4</span><span class="token punctuation">]</span>: <span class="token builtin class-name">set</span> environment variables

<span class="token punctuation">[</span>step <span class="token number">6</span><span class="token punctuation">]</span>: init datanode
The files belonging to this database system will be owned by user <span class="token string">&quot;breezeshane&quot;</span><span class="token builtin class-name">.</span>
This user must also own the server process.

The database cluster will be initialized with locale <span class="token string">&quot;en_US.UTF-8&quot;</span><span class="token builtin class-name">.</span>
The default database encoding has accordingly been <span class="token builtin class-name">set</span> to <span class="token string">&quot;UTF8&quot;</span><span class="token builtin class-name">.</span>
The default text search configuration will be <span class="token builtin class-name">set</span> to <span class="token string">&quot;english&quot;</span><span class="token builtin class-name">.</span>

creating directory /home/breezeshane/openGauss/data/single_node <span class="token punctuation">..</span>. ok
creating subdirectories <span class="token punctuation">..</span>. ok
selecting default max_connections <span class="token punctuation">..</span>. <span class="token number">100</span>
selecting default shared_buffers <span class="token punctuation">..</span>. 32MB
creating configuration files <span class="token punctuation">..</span>. ok
Begin init undo subsystem meta.
<span class="token punctuation">[</span>INIT UNDO<span class="token punctuation">]</span> Init undo subsystem meta successfully.
creating template1 database <span class="token keyword">in</span> /home/breezeshane/openGauss/data/single_node/base/1 <span class="token punctuation">..</span>. The core dump path is an invalid directory
<span class="token number">2022</span>-03-30 <span class="token number">21</span>:05:33.466 <span class="token punctuation">[</span>unknown<span class="token punctuation">]</span> <span class="token punctuation">[</span>unknown<span class="token punctuation">]</span> localhost <span class="token number">139689665127360</span> <span class="token number">0</span><span class="token punctuation">[</span><span class="token number">0</span>:0<span class="token comment">#0]  [BACKEND] WARNING:  macAddr is 39087/1707678456, sysidentifier is 2561631689/452484890, randomNum is 3818217242</span>
ok
initializing pg_authid <span class="token punctuation">..</span>. ok
setting password <span class="token punctuation">..</span>. ok
initializing dependencies <span class="token punctuation">..</span>. ok
loading PL/pgSQL server-side language <span class="token punctuation">..</span>. ok
creating system views <span class="token punctuation">..</span>. ok
creating performance views <span class="token punctuation">..</span>. ok
loading system objects<span class="token string">&#39; descriptions ... ok
creating collations ... ok
creating conversions ... ok
creating dictionaries ... ok
setting privileges on built-in objects ... ok
initialize global configure for bucketmap length ... ok
creating information schema ... ok
loading foreign-data wrapper for distfs access ... ok
loading foreign-data wrapper for hdfs access ... ok
loading foreign-data wrapper for log access ... ok
loading hstore extension ... ok
loading foreign-data wrapper for MOT access ... ok
loading security plugin ... ok
update system tables ... ok
creating snapshots catalog ... ok
vacuuming database template1 ... ok
copying template1 to template0 ... ok
copying template1 to postgres ... ok
freezing database template0 ... ok
freezing database template1 ... ok
freezing database postgres ... ok

WARNING: enabling &quot;trust&quot; authentication for local connections
You can change this by editing pg_hba.conf or using the option -A, or
--auth-local and --auth-host, the next time you run gs_initdb.

Success. You can now start the database server of single node using:

    gaussdb -D /home/breezeshane/openGauss/data/single_node --single_node
or
    gs_ctl start -D /home/breezeshane/openGauss/data/single_node -Z single_node -l logfile

[step 7]: start datanode
[2022-03-30 21:06:05.221][105616][][gs_ctl]: gs_ctl started,datadir is /home/breezeshane/openGauss/data/single_node 
[2022-03-30 21:06:05.290][105616][][gs_ctl]: waiting for server to start...
.0 LOG:  [Alarm Module]can not read GAUSS_WARNING_TYPE env.
	
0 LOG:  [Alarm Module]Host Name: Arknights 
	
0 LOG:  [Alarm Module]Host IP: 127.0.1.1 
	
0 LOG:  [Alarm Module]Get ENV GS_CLUSTER_NAME failed!
	
0 LOG:  [Alarm Module]ERROR: environment variable $GAUSSHOME is not set!
	
0 LOG:  [Alarm Module]ERROR: environment variable $GAUSSHOME is not set!
	
0 WARNING:  not found GAUSSHOME enviroment variable.
0 WARNING:  failed to open feature control file, please check whether it exists: FileName=gaussdb.version, Errno=2, Errmessage=No such file or directory.
0 WARNING:  failed to parse feature control file: gaussdb.version.
0 WARNING:  Failed to load the product control file, so gaussdb cannot distinguish product version.
The core dump path is an invalid directory
2022-03-30 21:06:05.422 [unknown] [unknown] localhost 140319329661888 0[0:0#0]  0 [BACKEND] LOG:  when starting as multi_standby mode, we couldn&#39;</span>t support data replicaton.
gaussdb.state does not exist, and skipt setting since it is optional.2022-03-30 <span class="token number">21</span>:06:05.422 <span class="token punctuation">[</span>unknown<span class="token punctuation">]</span> <span class="token punctuation">[</span>unknown<span class="token punctuation">]</span> localhost <span class="token number">140319329661888</span> <span class="token number">0</span><span class="token punctuation">[</span><span class="token number">0</span>:0<span class="token comment">#0]  0 [BACKEND] LOG:  [Alarm Module]can not read GAUSS_WARNING_TYPE env.</span>
	
<span class="token number">2022</span>-03-30 <span class="token number">21</span>:06:05.422 <span class="token punctuation">[</span>unknown<span class="token punctuation">]</span> <span class="token punctuation">[</span>unknown<span class="token punctuation">]</span> localhost <span class="token number">140319329661888</span> <span class="token number">0</span><span class="token punctuation">[</span><span class="token number">0</span>:0<span class="token comment">#0]  0 [BACKEND] LOG:  [Alarm Module]Host Name: Arknights </span>
	
<span class="token number">2022</span>-03-30 <span class="token number">21</span>:06:05.422 <span class="token punctuation">[</span>unknown<span class="token punctuation">]</span> <span class="token punctuation">[</span>unknown<span class="token punctuation">]</span> localhost <span class="token number">140319329661888</span> <span class="token number">0</span><span class="token punctuation">[</span><span class="token number">0</span>:0<span class="token comment">#0]  0 [BACKEND] LOG:  [Alarm Module]Host IP: 127.0.1.1 </span>
	
<span class="token number">2022</span>-03-30 <span class="token number">21</span>:06:05.422 <span class="token punctuation">[</span>unknown<span class="token punctuation">]</span> <span class="token punctuation">[</span>unknown<span class="token punctuation">]</span> localhost <span class="token number">140319329661888</span> <span class="token number">0</span><span class="token punctuation">[</span><span class="token number">0</span>:0<span class="token comment">#0]  0 [BACKEND] LOG:  [Alarm Module]Get ENV GS_CLUSTER_NAME failed!</span>
	
<span class="token number">2022</span>-03-30 <span class="token number">21</span>:06:05.422 <span class="token punctuation">[</span>unknown<span class="token punctuation">]</span> <span class="token punctuation">[</span>unknown<span class="token punctuation">]</span> localhost <span class="token number">140319329661888</span> <span class="token number">0</span><span class="token punctuation">[</span><span class="token number">0</span>:0<span class="token comment">#0]  0 [BACKEND] LOG:  [Alarm Module]ERROR: environment variable $GAUSSHOME is not set!</span>
	
<span class="token number">2022</span>-03-30 <span class="token number">21</span>:06:05.422 <span class="token punctuation">[</span>unknown<span class="token punctuation">]</span> <span class="token punctuation">[</span>unknown<span class="token punctuation">]</span> localhost <span class="token number">140319329661888</span> <span class="token number">0</span><span class="token punctuation">[</span><span class="token number">0</span>:0<span class="token comment">#0]  0 [BACKEND] LOG:  [Alarm Module]ERROR: environment variable $GAUSSHOME is not set!</span>
	
Get environment of GAUSSHOME failed.
<span class="token number">2022</span>-03-30 <span class="token number">21</span>:06:05.422 <span class="token punctuation">[</span>unknown<span class="token punctuation">]</span> <span class="token punctuation">[</span>unknown<span class="token punctuation">]</span> localhost <span class="token number">140319329661888</span> <span class="token number">0</span><span class="token punctuation">[</span><span class="token number">0</span>:0<span class="token comment">#0]  0 [BACKEND] FATAL:  Get environment of GAUSSHOME failed.</span>
	
<span class="token punctuation">[</span><span class="token number">2022</span>-03-30 <span class="token number">21</span>:06:06.291<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">105616</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span>gs_ctl<span class="token punctuation">]</span>: waitpid <span class="token number">105619</span> failed, exitstatus is <span class="token number">256</span>, ret is <span class="token number">2</span>

<span class="token punctuation">[</span><span class="token number">2022</span>-03-30 <span class="token number">21</span>:06:06.291<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">105616</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span>gs_ctl<span class="token punctuation">]</span>: stopped waiting
<span class="token punctuation">[</span><span class="token number">2022</span>-03-30 <span class="token number">21</span>:06:06.291<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">105616</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span>gs_ctl<span class="token punctuation">]</span>: could not start server
Examine the log output.
<span class="token function">import</span> sql <span class="token function">file</span>
Would you like to create a demo database <span class="token punctuation">(</span>yes/no<span class="token punctuation">)</span>? no
Input no, operation skip.
❯ gaussdb
<span class="token number">0</span> LOG:  <span class="token punctuation">[</span>Alarm Module<span class="token punctuation">]</span>can not <span class="token builtin class-name">read</span> GAUSS_WARNING_TYPE env.
	
<span class="token number">0</span> LOG:  <span class="token punctuation">[</span>Alarm Module<span class="token punctuation">]</span>Host Name: Arknights 
	
<span class="token number">0</span> LOG:  <span class="token punctuation">[</span>Alarm Module<span class="token punctuation">]</span>Host IP: <span class="token number">127.0</span>.1.1 
	
<span class="token number">0</span> LOG:  <span class="token punctuation">[</span>Alarm Module<span class="token punctuation">]</span>Get ENV GS_CLUSTER_NAME failed<span class="token operator">!</span>
	
<span class="token number">0</span> LOG:  <span class="token punctuation">[</span>Alarm Module<span class="token punctuation">]</span>ERROR: environment variable <span class="token variable">$GAUSSHOME</span> is not set<span class="token operator">!</span>
	
<span class="token number">0</span> LOG:  <span class="token punctuation">[</span>Alarm Module<span class="token punctuation">]</span>ERROR: environment variable <span class="token variable">$GAUSSHOME</span> is not set<span class="token operator">!</span>
	
<span class="token number">0</span> WARNING:  not found GAUSSHOME enviroment variable.
<span class="token number">0</span> WARNING:  failed to <span class="token function">open</span> feature control file, please check whether it exists: <span class="token assign-left variable">FileName</span><span class="token operator">=</span>gaussdb.version, <span class="token assign-left variable">Errno</span><span class="token operator">=</span><span class="token number">2</span>, <span class="token assign-left variable">Errmessage</span><span class="token operator">=</span>No such <span class="token function">file</span> or directory.
<span class="token number">0</span> WARNING:  failed to parse feature control file: gaussdb.version.
<span class="token number">0</span> WARNING:  Failed to load the product control file, so gaussdb cannot distinguish product version.
The core dump path is an invalid directory
 <span class="token number">0</span> <span class="token punctuation">[</span>BACKEND<span class="token punctuation">]</span> LOG:  environment variable <span class="token variable">$PGDATA</span> is NULL or size is out of <span class="token number">1024</span>
	
 <span class="token number">0</span> <span class="token punctuation">[</span>BACKEND<span class="token punctuation">]</span> FATAL:  Incorrect backend environment variable <span class="token variable">$PGDATA</span>
 <span class="token number">0</span> <span class="token punctuation">[</span>BACKEND<span class="token punctuation">]</span> DETAIL:  Please refer to the backend instance log <span class="token keyword">for</span> the detail
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="opengauss配置" tabindex="-1"><a class="header-anchor" href="#opengauss配置" aria-hidden="true">#</a> openGauss配置</h2><p>安装完成之后我们执行<code>ps ux | grep gaussdb</code>和<code>gs_ctl query -D $HOME/openGauss/data/single_node</code>来查看进程是否正常. 以下是具体输出细节.</p><details class="hint-container details"><summary>Info</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>❯ <span class="token function">ps</span> ux <span class="token operator">|</span> <span class="token function">grep</span> gaussdb
breezes+  <span class="token number">107155</span>  <span class="token number">0.0</span>  <span class="token number">0.0</span>  <span class="token number">11536</span>  <span class="token number">2676</span> pts/1    S+   <span class="token number">21</span>:09   <span class="token number">0</span>:00 <span class="token function">grep</span> <span class="token parameter variable">--color</span><span class="token operator">=</span>auto gaussdb
❯ gs_ctl query <span class="token parameter variable">-D</span> ~/openGauss/data/single_node
<span class="token punctuation">[</span><span class="token number">2022</span>-03-30 <span class="token number">21</span>:10:17.458<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">107813</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span>gs_ctl<span class="token punctuation">]</span>: gs_ctl query ,datadir is /home/breezeshane/openGauss/data/single_node 
<span class="token punctuation">[</span><span class="token number">2022</span>-03-30 <span class="token number">21</span>:10:17.458<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">107813</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span>gs_ctl<span class="token punctuation">]</span>:  invalid data <span class="token keyword">in</span> PID <span class="token function">file</span> <span class="token string">&quot;/home/breezeshane/openGauss/data/single_node/postmaster.pid&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>`,35),m=s("code",null,"gs_om",-1),k={href:"https://github.com/opengauss-mirror/openGauss-OM",target:"_blank",rel:"noopener noreferrer"},v=t(`<p>我们可以拉取下来然后编译构建, 执行:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> clone https://github.com/opengauss-mirror/openGauss-OM
<span class="token builtin class-name">cd</span> openGauss-OM
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>中间出现了小差池, 我误以为那个是<code>gs_om</code>的源代码, 需要我做编译才能得到, 但后来通过<code>tree . | bat</code>查看后发现它其实是一个脚本. 于是我确认它的位置之后, 手动添加了环境变量<code>export PATH=&quot;$HOME/openGauss/openGauss-OM/script:$HOME/openGauss/bin:$PATH&quot;</code>, 这样就可以直接使用<code>gs_om</code>了, 当我执行<code>gs_om -t status --detail</code>时给出了报错: <code>zsh: permission denied: gs_om</code>.</p><p>于是我执行<code>ls -lb openGauss-OM/script</code>来查看相关权限情况的时候, 发现给出的信息是:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>total <span class="token number">400</span>
drwxr-xr-x <span class="token number">1</span> breezeshane breezeshane   <span class="token number">156</span>  <span class="token number">3</span>月 <span class="token number">30</span> <span class="token number">23</span>:10 base_diff
drwxr-xr-x <span class="token number">1</span> breezeshane breezeshane    <span class="token number">82</span>  <span class="token number">3</span>月 <span class="token number">30</span> <span class="token number">23</span>:10 base_utils
drwxr-xr-x <span class="token number">1</span> breezeshane breezeshane    <span class="token number">62</span>  <span class="token number">3</span>月 <span class="token number">30</span> <span class="token number">23</span>:10 config
drwxr-xr-x <span class="token number">1</span> breezeshane breezeshane   <span class="token number">130</span>  <span class="token number">3</span>月 <span class="token number">30</span> <span class="token number">23</span>:10 domain_utils
-rw-r--r-- <span class="token number">1</span> breezeshane breezeshane  <span class="token number">8916</span>  <span class="token number">3</span>月 <span class="token number">30</span> <span class="token number">23</span>:10 gs_backup
-rw-r--r-- <span class="token number">1</span> breezeshane breezeshane <span class="token number">64836</span>  <span class="token number">3</span>月 <span class="token number">30</span> <span class="token number">23</span>:10 gs_check
-rw-r--r-- <span class="token number">1</span> breezeshane breezeshane <span class="token number">60769</span>  <span class="token number">3</span>月 <span class="token number">30</span> <span class="token number">23</span>:10 gs_checkos
-rw-r--r-- <span class="token number">1</span> breezeshane breezeshane <span class="token number">10802</span>  <span class="token number">3</span>月 <span class="token number">30</span> <span class="token number">23</span>:10 gs_checkperf
-rw-r--r-- <span class="token number">1</span> breezeshane breezeshane <span class="token number">16485</span>  <span class="token number">3</span>月 <span class="token number">30</span> <span class="token number">23</span>:10 gs_collector
-rw-r--r-- <span class="token number">1</span> breezeshane breezeshane <span class="token number">14625</span>  <span class="token number">3</span>月 <span class="token number">30</span> <span class="token number">23</span>:10 gs_dropnode
-rw-r--r-- <span class="token number">1</span> breezeshane breezeshane <span class="token number">24871</span>  <span class="token number">3</span>月 <span class="token number">30</span> <span class="token number">23</span>:10 gs_expansion
-rw-r--r-- <span class="token number">1</span> breezeshane breezeshane <span class="token number">12400</span>  <span class="token number">3</span>月 <span class="token number">30</span> <span class="token number">23</span>:10 gs_install
-rw-r--r-- <span class="token number">1</span> breezeshane breezeshane <span class="token number">32869</span>  <span class="token number">3</span>月 <span class="token number">30</span> <span class="token number">23</span>:10 gs_om
-rw-r--r-- <span class="token number">1</span> breezeshane breezeshane <span class="token number">15724</span>  <span class="token number">3</span>月 <span class="token number">30</span> <span class="token number">23</span>:10 gs_postuninstall
-rw-r--r-- <span class="token number">1</span> breezeshane breezeshane <span class="token number">19588</span>  <span class="token number">3</span>月 <span class="token number">30</span> <span class="token number">23</span>:10 gs_preinstall
drwxr-xr-x <span class="token number">1</span> breezeshane breezeshane   <span class="token number">120</span>  <span class="token number">3</span>月 <span class="token number">30</span> <span class="token number">23</span>:10 gspylib
-rw-r--r-- <span class="token number">1</span> breezeshane breezeshane  <span class="token number">9048</span>  <span class="token number">3</span>月 <span class="token number">30</span> <span class="token number">23</span>:10 gs_ssh
-rw-r--r-- <span class="token number">1</span> breezeshane breezeshane <span class="token number">57267</span>  <span class="token number">3</span>月 <span class="token number">30</span> <span class="token number">23</span>:10 gs_sshexkey
-rw-r--r-- <span class="token number">1</span> breezeshane breezeshane  <span class="token number">6347</span>  <span class="token number">3</span>月 <span class="token number">30</span> <span class="token number">23</span>:10 gs_uninstall
-rw-r--r-- <span class="token number">1</span> breezeshane breezeshane <span class="token number">13305</span>  <span class="token number">3</span>月 <span class="token number">30</span> <span class="token number">23</span>:10 gs_upgradectl
drwxr-xr-x <span class="token number">1</span> breezeshane breezeshane   <span class="token number">196</span>  <span class="token number">3</span>月 <span class="token number">30</span> <span class="token number">23</span>:10 impl
-rw-r--r-- <span class="token number">1</span> breezeshane breezeshane     <span class="token number">0</span>  <span class="token number">3</span>月 <span class="token number">30</span> <span class="token number">23</span>:10 __init__.py
-rw-r--r-- <span class="token number">1</span> breezeshane breezeshane  <span class="token number">6110</span>  <span class="token number">3</span>月 <span class="token number">30</span> <span class="token number">23</span>:10 <span class="token function">killall</span>
drwxr-xr-x <span class="token number">1</span> breezeshane breezeshane   <span class="token number">974</span>  <span class="token number">3</span>月 <span class="token number">30</span> <span class="token number">23</span>:10 <span class="token builtin class-name">local</span>
drwxr-xr-x <span class="token number">1</span> breezeshane breezeshane   <span class="token number">222</span>  <span class="token number">3</span>月 <span class="token number">30</span> <span class="token number">23</span>:10 os_platform
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>显然<code>gs_om</code>缺少执行权限, 于是我执行<code>sudo chmod o+x openGauss-OM/script/gs_om</code>后即可通过zsh来使用<code>gs_om</code>了.</p><p>但是, 最后我执行<code>gs_om -t status --detail</code>的时候给出了报错:</p><div class="hint-container danger"><p class="hint-container-title">Real Error</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>❯ gs_om <span class="token parameter variable">-t</span> status <span class="token parameter variable">--detail</span>
Traceback <span class="token punctuation">(</span>most recent call last<span class="token punctuation">)</span>:
  File <span class="token string">&quot;/home/breezeshane/openGauss/openGauss-OM/script/gs_om&quot;</span>, line <span class="token number">29</span>, <span class="token keyword">in</span> <span class="token operator">&lt;</span>module<span class="token operator">&gt;</span>
    from gspylib.common.ParameterParsecheck <span class="token function">import</span> Parameter
  File <span class="token string">&quot;/home/breezeshane/openGauss/openGauss-OM/script/gspylib/common/ParameterParsecheck.py&quot;</span>, line <span class="token number">27</span>, <span class="token keyword">in</span> <span class="token operator">&lt;</span>module<span class="token operator">&gt;</span>
    from gspylib.common.Common <span class="token function">import</span> DefaultValue
  File <span class="token string">&quot;/home/breezeshane/openGauss/openGauss-OM/script/gspylib/common/Common.py&quot;</span>, line <span class="token number">96</span>, <span class="token keyword">in</span> <span class="token operator">&lt;</span>module<span class="token operator">&gt;</span>
    from os_platform.UserPlatform <span class="token function">import</span> g_Platform
  File <span class="token string">&quot;/home/breezeshane/openGauss/openGauss-OM/script/os_platform/UserPlatform.py&quot;</span>, line <span class="token number">67</span>, <span class="token keyword">in</span> <span class="token operator">&lt;</span>module<span class="token operator">&gt;</span>
    g_Platform <span class="token operator">=</span> UserPlatform<span class="token punctuation">(</span><span class="token punctuation">)</span>.userPlatform
  File <span class="token string">&quot;/home/breezeshane/openGauss/openGauss-OM/script/os_platform/UserPlatform.py&quot;</span>, line <span class="token number">48</span>, <span class="token keyword">in</span> __init__
    raise Exception<span class="token punctuation">(</span>ErrorCode.GAUSS_519<span class="token punctuation">[</span><span class="token string">&quot;GAUSS_51900&quot;</span><span class="token punctuation">]</span> +
Exception: <span class="token punctuation">[</span>GAUSS-51900<span class="token punctuation">]</span> <span class="token builtin class-name">:</span> The current OS is not supported.Supported platforms are: <span class="token punctuation">[</span><span class="token string">&#39;suse&#39;</span>, <span class="token string">&#39;redhat&#39;</span>, <span class="token string">&#39;centos&#39;</span>, <span class="token string">&#39;euleros&#39;</span>, <span class="token string">&#39;openeuler&#39;</span>, <span class="token string">&#39;kylin&#39;</span>, <span class="token string">&#39;asianux&#39;</span>, <span class="token string">&#39;debian&#39;</span>, <span class="token string">&#39;ubuntu&#39;</span><span class="token punctuation">]</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><p>我的评价是: 寄!!!</p><p>虽然咱没有现成的, 我们还是可以自行编译的, 不是说毫无希望.</p><h2 id="重整旗鼓" tabindex="-1"><a class="header-anchor" href="#重整旗鼓" aria-hidden="true">#</a> 重整旗鼓</h2><p>官方文档说要保证以下依赖都已经安装好:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>libaio-devel
ncurses-devel
pam-devel
libffi-devel
python3-devel
libtool
libtool-devel 
libtool-ltdl
python-devel
openssl-devel
bison
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我亲自搜索考察, 确认是当前系统装有以上依赖. 文档提到需要装gcc7.3和cmake(&gt;=3.16.5), 当前我的状态是cmake满足了条件, 但gcc是11.2.0, 版本差距过大, 又回想到曾经使用Manjaro的时候gcc版本更迭后系统出现了问题, 因此认为gcc11不能直接编译(没有亲自实践过, 如果确实能编译, 欢迎前来指正), 我便转而去安装gcc(7.5.0).</p><blockquote><p>编译要很久的, 如果正好是晚上的话我建议你先睡一觉. 另外提示一下, 这个编译功耗比较大, 如果只有笔记本电源支撑的话建议不要编译.</p></blockquote><p>终于编译完成了, 现在我们下载openGauss的第三方依赖库, 下载完之后我们进行编译, 执行:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">git</span> clone https://gitee.com/opengauss/openGauss-third_party.git
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>但事情总不会这样顺利, 再次遇到报错:</p><div class="hint-container danger"><p class="hint-container-title">Error</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>❯ <span class="token function">git</span> clone https://gitee.com/opengauss/openGauss-third_party.git
Cloning into <span class="token string">&#39;openGauss-third_party&#39;</span><span class="token punctuation">..</span>.
remote: Enumerating objects: <span class="token number">2936</span>, done.
remote: Counting objects: <span class="token number">100</span>% <span class="token punctuation">(</span><span class="token number">496</span>/496<span class="token punctuation">)</span>, done.
remote: Compressing objects: <span class="token number">100</span>% <span class="token punctuation">(</span><span class="token number">466</span>/466<span class="token punctuation">)</span>, done.
error: <span class="token number">8112</span> bytes of body are still expectedB <span class="token operator">|</span> <span class="token number">2.16</span> MiB/s     
fetch-pack: unexpected disconnect <span class="token keyword">while</span> reading sideband packet
fatal: early EOF
fatal: fetch-pack: invalid index-pack output
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><p>于是我继续查询, 发现它出错的原因是拉取的项目体积过大导致报错，连接中断了. 好吧, 几经折腾才发现其实是网络问题, 换手机热点就能解决了......</p><p>好的, 接下来我们进入到build文件夹下, 按照官方文档给出的那样, 执行<code>sh build_all.sh</code>, 然后看见了这个报错:</p><div class="hint-container danger"><p class="hint-container-title">Error</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>❯ <span class="token function">sh</span> build_all.sh
--------------------------------openssl-------------------------------------------------
Traceback <span class="token punctuation">(</span>most recent call last<span class="token punctuation">)</span>:
  File <span class="token string">&quot;build.py&quot;</span>, line <span class="token number">308</span>, <span class="token keyword">in</span> <span class="token operator">&lt;</span>module<span class="token operator">&gt;</span>
    Operator.build_mode<span class="token punctuation">(</span><span class="token punctuation">)</span>
  File <span class="token string">&quot;build.py&quot;</span>, line <span class="token number">96</span>, <span class="token keyword">in</span> build_mode
    self.binary_parser<span class="token punctuation">(</span><span class="token punctuation">)</span>
  File <span class="token string">&quot;build.py&quot;</span>, line <span class="token number">87</span>, <span class="token keyword">in</span> binary_parser
    assert False
AssertionError
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><p>不了解发生了什么, 但是又想到这里其实是在编译依赖库, 我既然已经比对好相应的依赖, 不编译也没关系, 于是直接拉取了openGauss-server的源代码试图直接编译.</p><p>最后我遇到了这个报错:</p><div class="hint-container danger"><p class="hint-container-title">Error</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>❯ <span class="token function">sh</span> build.sh <span class="token parameter variable">-m</span> release <span class="token parameter variable">-3rd</span> ~/binarylibs
ROOT_DIR <span class="token builtin class-name">:</span> /home/breezeshane/openGauss-server
We only support openEuler<span class="token punctuation">(</span>aarch64<span class="token punctuation">)</span>, EulerOS<span class="token punctuation">(</span>aarch64<span class="token punctuation">)</span>, CentOS, Kylin<span class="token punctuation">(</span>aarch64<span class="token punctuation">)</span> platform.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><p>于是我就知道了, 解决这个问题就应该直接去执行:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">rm</span> <span class="token parameter variable">-rf</span> openGauss-* binarylibs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>至此这篇文章就已经结束了(x).</p><h2 id="找到出路" tabindex="-1"><a class="header-anchor" href="#找到出路" aria-hidden="true">#</a> 找到出路</h2><p>最后我才使用Docker虚拟化技术来完成安装, 只需要执行:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> pull enmotech/opengauss
<span class="token function">docker</span> run <span class="token parameter variable">--name</span> opengauss <span class="token parameter variable">--privileged</span><span class="token operator">=</span>true <span class="token parameter variable">-d</span> <span class="token parameter variable">-e</span> <span class="token assign-left variable">GS_PASSWORD</span><span class="token operator">=</span>Enmo@123 <span class="token parameter variable">-p</span> <span class="token number">15432</span>:5432 enmotech/opengauss:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你没有像我上面删掉库的话, 那么在这个情况下你可以直接使用之前安装好的openGauss, 执行:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>gsql <span class="token parameter variable">-d</span> postgres <span class="token parameter variable">-U</span> gaussdb -W<span class="token string">&#39;Enmo@123&#39;</span> <span class="token parameter variable">-h</span> <span class="token number">127.0</span>.0.1 <span class="token parameter variable">-p15432</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>但如果不幸你删掉了, 也不用再重新折腾一遍, docker这里你还是可以直接使用的, 需要按照顺序继续执行:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> opengauss <span class="token function">bash</span>
<span class="token function">su</span> - omm
gsql <span class="token parameter variable">-d</span> postgres <span class="token parameter variable">-U</span> gaussdb -W<span class="token string">&#39;Enmo@123&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这才是真正的圆满结局.</p>`,36);function h(g,f){const a=o("ExternalLinkIcon");return p(),l("div",null,[r,u,s("p",null,[n("去"),s("a",d,[n("官方网站"),e(a)]),n("下载CentOS版本的包.")]),b,s("p",null,[n("官方文档给出的"),m,n("是一种专门用来管理openGauss的操作工具, 全称应该是 openGauss Operation Manager, 于是我去搜索了一下这个工具, 果然GitHub上确实有这个工具的源代码, 在这里给出链接: "),s("a",k,[n("openGauss-OM"),e(a)]),n(".")]),v])}const G=i(c,[["render",h],["__file","openGauss.html.vue"]]);export{G as default};
