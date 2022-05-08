```shell
╭─visualdust at VD-SERVER-MJKDE in ⌁
╰─λ cd /mnt                                                                                      0 (0.007s) < 16:56:16
╭─visualdust at VD-SERVER-MJKDE in /mnt
╰─λ ls                                                                                           0 (0.002s) < 16:56:35
╭─visualdust at VD-SERVER-MJKDE in /mnt
╰─λ cd /dev/sde1^C                                                                               0 (0.020s) < 16:56:36
╭─visualdust at VD-SERVER-MJKDE in /mnt
╰─λ sudo mount /dev/sde1 /mnt                                                                    0 (0.020s) < 16:56:36
mount: /mnt: mount(2) system call failed: File exists.
╭─visualdust at VD-SERVER-MJKDE in /mnt
╰─λ reboot                                                                                      32 (0.018s) < 16:56:55
╭─visualdust at VD-SERVER-MJKDE in /mnt
╰─λ Connection to 125.217.53.150 closed by remote host.                                          0 (0.104s) < 16:57:06
Connection to 125.217.53.150 closed.
❯ ssh visualdust@125.217.53.150
visualdust@125.217.53.150's password: 
Last login: Sun May  1 16:54:11 2022 from 10.33.41.128
Welcome to fish, the friendly interactive shell
Type `help` for instructions on how to use fish
╭─visualdust at VD-SERVER-MJKDE in ⌁
╰─λ sudo mount /dev/sde1 /mnt/temp                                                               0 (0.000s) < 16:57:42
mount: /mnt/temp: mount point does not exist.
╭─visualdust at VD-SERVER-MJKDE in ⌁
╰─λ mkdir /mnt/temp                                                                             32 (0.032s) < 16:58:22
mkdir: cannot create directory ‘/mnt/temp’: Permission denied
╭─visualdust at VD-SERVER-MJKDE in ⌁
╰─λ sudo mkdir /mnt/temp                                                                         1 (0.000s) < 16:58:33
╭─visualdust at VD-SERVER-MJKDE in ⌁
╰─λ sudo mount /dev/sde1 /mnt/temp                                                               0 (0.017s) < 16:58:38
mount: /mnt/temp: wrong fs type, bad option, bad superblock on /dev/sde1, missing codepage or helper program, or other error.
╭─visualdust at VD-SERVER-MJKDE in ⌁
╰─λ sudo mount /dev/sde1 /mnt/temp/                                                             32 (0.055s) < 16:58:41
mount: /mnt/temp: wrong fs type, bad option, bad superblock on /dev/sde1, missing codepage or helper program, or other error.
╭─visualdust at VD-SERVER-MJKDE in ⌁
╰─λ sudo df -Th                                                                                 32 (0.036s) < 16:59:01
Filesystem     Type      Size  Used Avail Use% Mounted on
dev            devtmpfs  7.8G     0  7.8G   0% /dev
run            tmpfs     7.8G  2.3M  7.8G   1% /run
/dev/sda2      ext4      100G   79G   17G  84% /
tmpfs          tmpfs     7.8G     0  7.8G   0% /dev/shm
tmpfs          tmpfs     7.8G  184K  7.8G   1% /tmp
/dev/sda1      vfat      300M  280K  300M   1% /boot/efi
/dev/sdc1      btrfs     2.8T  1.1T  790G  58% /var/data
overlay        overlay   100G   79G   17G  84% /var/lib/docker/overlay2/b336f9ad2de3c9797f1dbf7fc5c4c819a5eb141af2c3d97107084a14beb0f588/merged
overlay        overlay   100G   79G   17G  84% /var/lib/docker/overlay2/2b172c0d568b4c19fecf4425085e203a6cd81323e5e408f738c7db982fab6f86/merged
overlay        overlay   100G   79G   17G  84% /var/lib/docker/overlay2/7d3cbb23aa929588ff6123056d0a6a432203c9a60bf2b3f5bc66fadd66c6f1d4/merged
overlay        overlay   100G   79G   17G  84% /var/lib/docker/overlay2/8273dcdf365ddd096f7af7b74129df0a33c52dc8071a6a7d4708d646d8acccb3/merged
overlay        overlay   100G   79G   17G  84% /var/lib/docker/overlay2/8d41ca04ea053829fc079b26885118dd388268bbbd0a7b213cbd3c3f7d0a2868/merged
overlay        overlay   100G   79G   17G  84% /var/lib/docker/overlay2/c5ad27859c1b22f113c8bc1fc508503555806ae73abdb9523fddb5719cb10214/merged
overlay        overlay   100G   79G   17G  84% /var/lib/docker/overlay2/7040d10fd25ba1cab3d0091e2ebb568cf519982e0ead7342db648a7347d8bca9/merged
overlay        overlay   100G   79G   17G  84% /var/lib/docker/overlay2/a5da2d6382d13f801558cba0e6a204ce7523bc8256c97b7c5d177e0bb949430b/merged
tmpfs          tmpfs     1.6G   48K  1.6G   1% /run/user/1000
overlay        overlay   100G   79G   17G  84% /var/lib/docker/overlay2/2fbd6b6af4f7907bea54192419ed97e1ee7b182005dad0e68f9ca1c391949640/merged
╭─visualdust at VD-SERVER-MJKDE in ⌁
╰─λ sudo fdisk -l                                                                                0 (0.017s) < 16:59:29
Disk /dev/sda: 119.24 GiB, 128035676160 bytes, 250069680 sectors
Disk model: SanDisk SD9SB8W1
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: gpt
Disk identifier: 153BED59-BFE2-9344-B851-B41BF19AC665

Device         Start       End   Sectors   Size Type
/dev/sda1       4096    618495    614400   300M EFI System
/dev/sda2     618496 214151996 213533501 101.8G Linux filesystem
/dev/sda3  214151997 250067789  35915793  17.1G Linux swap


Disk /dev/sdb: 931.51 GiB, 1000204886016 bytes, 1953525168 sectors
Disk model: WDC WD10EZEX-08W
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 4096 bytes
I/O size (minimum/optimal): 4096 bytes / 4096 bytes
Disklabel type: gpt
Disk identifier: 6260F623-29FE-AA4D-BB58-AC36EA7B8B7A

Device     Start        End    Sectors   Size Type
/dev/sdb1   2048 1953525134 1953523087 931.5G Linux filesystem


Disk /dev/sdc: 931.51 GiB, 1000204886016 bytes, 1953525168 sectors
Disk model: ST1000DM003-1CH1
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 4096 bytes
I/O size (minimum/optimal): 4096 bytes / 4096 bytes
Disklabel type: gpt
Disk identifier: 33D3E6E1-53FA-0D47-821E-696325A0EE2F

Device     Start        End    Sectors   Size Type
/dev/sdc1   2048 1953525134 1953523087 931.5G Linux filesystem


Disk /dev/sdd: 931.51 GiB, 1000204886016 bytes, 1953525168 sectors
Disk model: ST1000DM003-1CH1
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 4096 bytes
I/O size (minimum/optimal): 4096 bytes / 4096 bytes
Disklabel type: gpt
Disk identifier: 1EB4064D-DF36-4046-B829-C24BFBB93BBC

Device     Start        End    Sectors   Size Type
/dev/sdd1   2048 1953525134 1953523087 931.5G Linux filesystem


Disk /dev/sde: 3.64 TiB, 4000787030016 bytes, 7814037168 sectors
Disk model: EZAZ-00SF3B0    
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 4096 bytes
I/O size (minimum/optimal): 4096 bytes / 4096 bytes
Disklabel type: gpt
Disk identifier: 1846016B-34C7-6944-AC1D-A272E5756276

Device     Start        End    Sectors  Size Type
/dev/sde1   2048 7814031359 7814029312  3.6T Linux filesystem
╭─visualdust at VD-SERVER-MJKDE in ⌁
╰─λ poweroff                                                                                     0 (0.203s) < 17:00:14
╭─visualdust at VD-SERVER-MJKDE in ⌁
╰─λ poweroffConnection to 125.217.53.150 closed by remote host.                                  0 (0.061s) < 17:00:50
Connection to 125.217.53.150 closed.
```