#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/init.h>
#include <linux/proc_fs.h>
#include <asm/uaccess.h>	
#include <linux/seq_file.h>
#include <linux/hugetlb.h>

MODULE_LICENSE("GPL");
MODULE_DESCRIPTION("Modulo para los datos de la memoria RAM");
MODULE_AUTHOR("José Marcos García Olmino");

struct sysinfo inf;

//Funcion que se ejecutara cada vez que se lea el archivo con el comando CAT
static int escribir_archivo(struct seq_file *archivo, void *v)
{   
    long memoria_total;
    long memoria_libre;
    long memoria_en_uso;

    seq_printf(archivo, "***********************Modulo de Memoria**********************\n");
    si_meminfo(&inf);
    memoria_total = ((uint64_t)inf.totalram * inf.mem_unit)/(1024*1024);
    memoria_libre = ((uint64_t)inf.freeram * inf.mem_unit)/(1024*1024);
    memoria_en_uso = memoria_total - memoria_libre;
    seq_printf(archivo, "Memoria total: %8li\n", memoria_total);
    seq_printf(archivo, "Memoria libre: %8li\n", memoria_libre);
    seq_printf(archivo, "Memoria en uso: %8li\n", memoria_en_uso);
    return 0;
}

//Funcion que se ejecutara cada vez que se lea el archivo con el comando CAT
static int al_abrir(struct inode *inode, struct file *file)
{
    return single_open(file, escribir_archivo, NULL);
}

//Si el kernel es 5.6 o mayor se usa la estructura proc_ops
static struct proc_ops operaciones =
{
    .proc_open = al_abrir,
    .proc_read = seq_read
};

/*Si el kernel es menor al 5.6 usan file_operations
static struct file_operations operaciones =
{
    .open = al_abrir,
    .read = seq_read
};
*/

//Funcion a ejecuta al insertar el modulo en el kernel con insmod
static int _insert(void)
{
    proc_create("memo_201903895", 0, NULL, &operaciones);
    printk(KERN_INFO "201903895\n");
    return 0;
}

//Funcion a ejecuta al remover el modulo del kernel con rmmod
static void _remove(void)
{
    remove_proc_entry("memo_201903895", NULL);
    printk(KERN_INFO "Sistemas Operativos 1\n");
}

module_init(_insert);
module_exit(_remove);