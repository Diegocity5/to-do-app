const openTaskFormBtn = document.getElementById('open-task-form-btn');
const closeTaskFormBtn = document.getElementById('close-task-form-btn');
const taskForm = document.getElementById('task-form');
const titleInput = document.getElementById('title-input');
const dateInput = document.getElementById('date-input');
const descriptionInput = document.getElementById('description-input');
const addOrUpdateTaskBtn = document.getElementById('add-or-update-task-btn');
const confirmCloseDialog = document.getElementById('confirm-close-dialog');
const cancelBtn = document.getElementById('cancel-btn');
const discardBtn = document.getElementById('discard-btn');
const tasksContainer = document.getElementById('task-container');
const taskData = [];
const currentTask = {};


//Manejando eventos
//Mostrando el formulario de agregar tarea cuando se le da click al boton openTaskFormBtn
openTaskFormBtn.addEventListener('click', function(){
    taskForm.classList.toggle('hidden');//suicheo de la clase hidden.
});

//Mostrando el modal al dar click en el boton de cerrar formulario de tarea.
closeTaskFormBtn.addEventListener('click', ()=>{
    confirmCloseDialog.showModal();//metodo para mostrar modal
})

//Cerrando el modal al dar click en el boton cancel me permitira seguir editando la tarea en el fomulario.
cancelBtn.addEventListener('click', ()=>{
    confirmCloseDialog.close();
    console.log('Se cerro el modal');
});

//Cerrando tanto el modal como el formulario de tarea si dan click en Discard boton.
discardBtn.addEventListener('click', ()=>{
    confirmCloseDialog.close();
    taskForm.classList.toggle('hidden');
});

//Previniendo que por defecto se refresque la pagina despues de enviar la información pues el evento submit hace eso.
taskForm.addEventListener('submit', (e)=>{
    e.preventDefault();//Entonces uso  preventDefault() para que me mantenga el formulario.
    /*Encontrando si la tarea objeto existe o no existe con la validación de su propiedd id usando el metodo findIndex*/
    const dataArrIndex = taskData.findIndex((item)=> item.id === currentTask.id);
    //creando el objeto tarea
    const taskObj = {
        //Una cadena de guiones y milisegundos trascurridos para un id unico en cada objeto tarea
        id: `${titleInput.value.toLowerCase().split(' ').join('-')}-${Date.now()}`,
        title: titleInput.value,
        date: dateInput.value,
        description: descriptionInput.value
    };
    //Si no existe en el array el indice osea es una nueva tarea
    if(dataArrIndex === -1){
        taskData.unshift(taskObj);//se agrega al inicio del array.
    }

    //Mostrar la tarea en la pagina
    //Iterando el array y desestructurando las propiedades de cada objeto como argumento para poder usar las keys directamente.
    taskData.forEach(({id, title, date, description})=>{});
});