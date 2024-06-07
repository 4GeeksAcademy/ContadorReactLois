// SecondsCounter.jsx

import React, { useState, useEffect } from "react"; //necesario para definir componentes en React.

/* useState para almacenar el estado de los segundos.
useEffect es decir,estamos diciendo a React, hay acciones que necesitan ocurrir después de que el componente se haya renderizado en el DOM, es decir, después de que el componente se haya mostrado en el navegador. (como la suscripción a eventos, el manejo de temporizadores o la solicitud de datos a un servidor.) 
En este caso, iniciar el contador cuando el componente se monta.*/

//1 ejercicio. el código crea un componente SecondsCounter (variable), que muestra un contador de segundos junto con un icono de reloj. Utiliza Bootstrap para el diseño y Font Awesome para el icono del reloj.

//mostrar los segundos a través del display, mostramos los segundos pasados ​​como texto.
//String(props.seconds) convierte el número de segundos en una cadena de texto.
//.padStart(6, '0') Esto se utiliza para asegurarse de que el número de segundos siempre tenga al menos 6 dígitos


//Aquí definimos un componente funcional llamado SecondsCounter
const SecondsCounter = () => {

//ESTADOS
  const [seconds, setSeconds] = useState(0); //Contador (segundos y el reinicio) a cero con useState. Almacena el número de segundos que queremos mostrar.
  const [isCounting, setIsCounting] = useState(false); // Estado para indicar si el contador está en marcha. Lo que significa que el contador no comenzará automáticamente y tendré que darle a Start
  const [initialValue, setInitialValue] = useState(0); //initialValue: El valor inicial desde donde el contador comenzará.
  const [alertValue, setAlertValue] = useState(null); //alertValue: El valor en el cual queremos que se muestre una alerta.


//EFECTOS SECUNDARIOS
  useEffect(() => {
    if (!isCounting) return; //comprobamos si isCounting es false. Esto significa significa que el temporizador está detenido, es decir, el contador está pausado y no está contando segundos.

    //Configuración del temporizador (contador)
    const intervalId = setInterval(() => { //SetInterval: ejecutar una función repetidamente después de un intervalo de tiempo especificado. Los argumentos que toma la función setInterval son  setSeconds y 1000 milisegundos.
      setSeconds(prevSeconds => {    //actualizando el estado "seconds". Usamos la función "prevSeconds" para obtener el valor actual de "seconds" y luego devolver el "nuevo valor" de "seconds".
        if (prevSeconds === alertValue) {
          setIsCounting (false) //detener el contador
          console.log ("has llegado a tu destino");
          return prevSeconds;// aqui no actualizo el estado de los segundos, hasta que le de a reset
        }
        
        return initialValue ? Math.max(prevSeconds - 1, 0) : prevSeconds + 1; //0 es el argumento de Math.max y representa el valor mínimo. Se utiliza para que no cuente numeros negativos
      }); // si initialValue no tiene un valor, estamos en modo de cuenta ascendente, donde simplemente incrementamos el contador cada segundo.
    }, 1000); //estamos pasando 1000 milisegundos, lo que equivale a 1 segundo.

    //Math.max(prevSeconds - 1, 0): Math.max toma dos números y devuelve el mayor de ellos. Esto significa que si prevSeconds - 1 es menor que 0, Math.max devolverá 0. De esta forma, el contador nunca irá por debajo de cero.


    // Cuando el componente SecondCounter, no se ejecute (es decir, cuando ya no se muestre en la pantalla) o cuando las "dependencias" "isCounting o initialValue" cambien. clearInterval(intervalId) detiene el temporizador que configurado con setInterval.
    return () => clearInterval(intervalId);
  }, [isCounting, initialValue, alertValue]); //// Agregamos alertValue a las dependencias para que el efecto se ejecute cuando este valor cambie.

  

// Funciones para manejar el inicio, parada, reinicio y reanudación del contador

const handleStart = () => {
  setSeconds(initialValue); //handleStart: // Iniciar el contador desde el valor inicial.
  setIsCounting(true);
};

const handleStop = () => setIsCounting(false); //handleStop: Detiene el contador.

const handleReset = () => {
  setSeconds(0); //handleStop: Detiene el contador.
  setIsCounting(false);
};

const handleResume = () => setIsCounting(true); // Reanudar el contador.


//RENDERIZADO.
  
return (
    <div>
      <div>
        <input 
          type="number" //ingresar un número.
          value={initialValue} //valor del input será siempre el mismo que el valor de initialValue (valor inicial desde el cual el temporizador debe comenzar) (tanto cualquier valor en cuenta ascendente  o en cuenta decreciente)
          onChange={(e) => setInitialValue(Number(e.target.value))} //onChange en React=  se activa cada vez que el valor del input cambia. (e)=.        . "setInitialValue(Number(e.target.value))": Esta función toma el nuevo valor del input (e.target.value), lo convierte en un número 
          placeholder="Set initial value" //placeholder es el texto que se muestra en el campo de entrada cuando no hay ningún valor.
        />
        <input 
          type="number" //ingresar un número.
          value={alertValue || ""} //Esto asegura que si alertValue es null o undefined, el valor del input será una cadena vacía. "alertValue", un valor específico en el que el usuario quiere que se muestre una alerta.
          //e.target.value:Representa el valor actual del campo de entrada. (Number(e.target.value))= Convierte el valor del campo de entrada a un número
          onChange={(e) => setAlertValue(Number(e.target.value))} //onChange={(e) => setAlertValue(Number(e.target.value))}:actualiza el estado alertValue con el nuevo valor numérico ingresado por el usuario.
          placeholder="Set alert value" 
        />
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleResume}>Resume</button>
      </div>
      <div className="ContainerSecondsCounter d-flex justify-content-center align-items-center bg-dark text-white p-3 rounded">
        <div className="IcClock p-2">
          <i className="fa fa-clock fa-2x"></i>
        </div>
        <div className="Display p-2 display-4">{String(seconds).padStart(6, '0')}</div>  
      </div>
    </div>
  );
};

export default SecondsCounter;

//.padStart(6, '0')}= cadenas de texto en JavaScript que asegura que la cadena resultante tenga una longitud mínima especificada (en este caso, 6)= es decir que aparecan números hasta 6 cifras.
//Si seconds es 5, String(seconds) será "5", y String(seconds).padStart(6, '0') será "000005". o Si seconds es 123, String(seconds) será "123", y String(seconds).padStart(6, '0') será "000123".
//exportamos el componente SecondsCounter para que pueda ser utilizado en otras partes de nuestra aplicación, en este caso, en home.jsx



/* ESTILOS CON BOOSTRAP

d-flex: (display) para un contenedor flexible, Controlar el diseño y la alineación de los elementos secundarios, es decir, el icono y el display.
-justify-content-center: Centrados horizontalmente.
-align-items-center: alinearán verticalmente en el centro.
-bg-dark:(backgroundColor)contenedor negro.
-p-3: (padding) Esta clase de Bootstrap agrega un relleno de tamaño 3 (16px) alrededor de todos los lados del elemento. En este caso, se agregará un relleno de 16px alrededor del contenedor div.
-p-2: (Padding) Esta clase de Bootstrap aplica un relleno de tamaño 2 (8px) alrededor del elemento al que se aplica. En este caso, se está aplicando al contenedor que envuelve al icono del reloj. El relleno proporciona un espacio uniforme alrededor del icono.
-rounded:(borderRadius: "0.25rem") Esta clase de Bootstrap redondea las esquinas del elemento, dándole bordes suavizados. En este caso, el contenedor div tendrá esquinas redondeadas.*/

//ícono de reloj usando Font Awesome (fa fa-clock)
//fa-2x: Esta clase de Font Awesome establece el tamaño del icono al doble del tamaño predeterminado. El tamaño predeterminado de Font Awesome es 1x, por lo que fa-2x hace que el icono sea el doble de grande
