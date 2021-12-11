#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/init.h>
#include <linux/proc_fs.h>
#include <asm/uaccess.h>	
#include <linux/seq_file.h>
#include <linux/hugetlb.h>
#include <linux/sched.h>
#include <linux/mm.h> 
MODULE_LICENSE("GPL");
MODULE_DESCRIPTION("Modulo para los datos de la memoria RAM");
MODULE_AUTHOR("José Marcos García Olmino");

struct task_struct *proceso, *proceso_hijo;
struct list_head *hijos;
//Funcion que se ejecutara cada vez que se lea el archivo con el comando CAT
static int escribir_archivo(struct seq_file *archivo, void *v)
{   
    
    seq_printf(archivo, "***********************Modulo CPU**********************\n");
    for_each_process(proceso){
        long ram_proceso_padre;
        get_task_struct(proceso);
        if (proceso->mm){
            ram_proceso_padre = get_mm_rss(proceso->mm);
            seq_printf(archivo, "Proceso %s (PID: %d) RAM: %lu  Estado: %ld\n", proceso->comm, proceso->pid, ram_proceso_padre,proceso->state);
        }else{
            seq_printf(archivo, "Proceso %s (PID: %d) Estado: %ld\n", proceso->comm, proceso->pid);
        }
        
        list_for_each(hijos, &(proceso->children)){
            proceso_hijo = list_entry(hijos, struct task_struct, sibling);
            seq_printf(archivo, "\tProceso Hijo %s (PID: %d) Estado: %ld\n", proceso_hijo->comm, proceso_hijo->pid, proceso_hijo->state);
        }
    }
    return 0;
}

//Funcion que se ejecutara cada vez que se lea el archivo con el comando CAT
static int al_abrir(struct inode *inode, struct file *file)
{
    return single_open(file, escribir_archivo, NULL);
}

static struct proc_ops operaciones =
{
    .proc_open = al_abrir,
    .proc_read = seq_read
};


static int _insert(void)
{
    proc_create("cpu_201903895", 0, NULL, &operaciones);
    printk(KERN_INFO "Jose Marcos Garcia Olmino\n");
    return 0;
}

//Funcion a ejecuta al remover el modulo del kernel con rmmod
static void _remove(void)
{
    remove_proc_entry("cpu_201903895", NULL);
    printk(KERN_INFO "Diciembre 2021\n");
}

module_init(_insert);
module_exit(_remove);