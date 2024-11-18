//Cuando hemos terminado con la parte de la base de datos, el dotenv ya no lo necesitaremos porque lo tendremos en el index.js y este importará todas las funciones que tenemos en la base de datos, por lo cual aunque podemos dejarlo repetido y no pasa nada, es una buena acción el eliminarlo.

//import dotenv from "dotenv";
//dotenv.config(); //lee el fichero .env y crea las variables de entorno
//--------------
import postgres from "postgres";

function conectar(){
    return postgres({
        host : process.env.DB_HOST,
        database : process.env.DB_NAME,
        user : process.env.DB_USER,
        password : process.env.DB_PASSWORD 
    });
}

export function leerTareas(){
    return new Promise(async (ok,ko) => {
        let conexion = conectar();

        try{

            let tareas = await conexion`SELECT * FROM tareas ORDER BY id`;

            conexion.end();

            ok(tareas);

        }catch(error){

            ko({ error : "error bbdd" });

        }
    });
}

export function crearTarea(tarea){
    return new Promise(async (ok,ko) => {
        let conexion = conectar();

        try{

            let [{id}] = await conexion`INSERT INTO tareas (tarea) VALUES (${tarea}) RETURNING id`;

            conexion.end();

            ok(id);

        }catch(error){

            ko({ error : "error bbdd" });

        }
    });
}

export function borrarTarea(id){
    return new Promise(async (ok,ko) => {
        let conexion = conectar();

        try{

            let {count} = await conexion`DELETE FROM tareas WHERE id = ${id}`;

            conexion.end();

            ok(count);

        }catch(error){
            
            ko({ error : "error bbdd" });

        }
    });
}

export function editarTarea(id,texto){
    return new Promise(async (ok,ko) => {
        let conexion = conectar();

        try{

            let {count} = await conexion`UPDATE tareas SET tarea = ${texto} WHERE id = ${id}`;

            conexion.end();

            ok(count);

        }catch(error){
            
            ko({ error : "error bbdd" });

        }
    });
}

export function editarEstado(id){
    return new Promise(async (ok,ko) => {
        let conexion = conectar();

        try{

            let {count} = await conexion`UPDATE tareas SET estado = NOT estado WHERE id = ${id}`;

            conexion.end();

            ok(count);

        }catch(error){
            
            ko({ error : "error bbdd" });

        }
    });
}




