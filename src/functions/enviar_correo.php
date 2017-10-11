<?php
/**
 * Archivo para enviar la información de Contacto al correo.
 * @author Keiler Mora <keilermora@gmail.com>
 *
 * @param string $_POST['idioma'] Iniciales del idioma del sitio web
 * @param string $_POST['nombre'] Nombre de la persona de contacto
 * @param string $_POST['correo'] Correo de la persona de contacto
 * @param string $_POST['asunto'] Asunto del contacto
 * @param string $_POST['mensaje'] Mensaje del contacto
 * @param bool $_POST['cc'] Enviar copia del correo al contacto
 *
 * @return string $respuesta Respuesta del servidor en formato json
 */

/**
 * @var array  $respuesta Respuesta del servidor en formato json
 */
$respuesta = array();

//---------------Verificar Variables---------------
if(
  isset($_POST['idioma']) &&
  isset($_POST['nombre']) &&
  isset($_POST['correo']) &&
  isset($_POST['mensaje']) &&
  isset($_POST['cc'])) {

  #Cargar el archivo json con el idioma
  $json = file_get_contents('../locales/'.$_POST['idioma'].'.json');
  #Descifrar el Json y guardarlo en un arreglo
  $traductor = json_decode($json, true);

  #Cargar la clase PhpMailer
  require_once('../classes/class.phpmailer.php');
  $mail = new PHPMailer;

  /**
   * @var string $correoDestinatario Correo del destinatario
   * @var string $nombreRemitente Nombre del remitente
   * @var string $correoRemitente Correo del remitente
   * @var string $asunto Asunto del mensaje
   * @var string $encabezados Encabezado del mensaje
   */
  $nombreDestinatario = 'Keiler Mora';
  $correoDestinatario = 'keilermora@gmail.com';
  $nombreRemitente = $_POST['nombre'];
  $correoRemitente = $_POST['correo'];
  $asunto = 'Formulario de contacto del sitio web keilermora.dualemento.com';
  $encabezados = 'MIME-Version: 1.0\r\n';
  $encabezados .= 'Content-type: text/html; charset=UTF-8\r\n';
  $encabezados .= 'From: '.$nombreRemitente.' <'.$correoRemitente.'>\r\n';
  $encabezados .= 'To: '.$nombreDestinatario.' <'.$correoDestinatario.'>\r\n';

  /** 
   * @var string $mensaje Mensaje del cliente
   * @var string $cuerpoMensaje Cuerpo del mensaje
   */
  $mensaje = $_POST['mensaje'];
  $cuerpoMensaje = '<h3>'.$traductor['mensaje-enviado-desde'].'</h3><br>';
  $cuerpoMensaje .= 'Correo: '.$correoRemitente.'<br>';
  $cuerpoMensaje .= 'Nombre: '.$nombreRemitente.'<br>';
  $cuerpoMensaje .= 'Mensaje: '.$mensaje;
  $cuerpoMensaje .= '<br>';

  if($_POST['cc']) {
    $encabezados .= 'CC: '.$nombreRemitente.' <'.$correoRemitente.'>\r\n';
    $cuerpoMensaje .= '<h4>'.$traductor['mensaje-con-copia'].'</h4>';
    $mail->AddCC($correoRemitente);
  }

  $mail->SetFrom($correoRemitente, $nombreRemitente);
  $mail->AddAddress($correoDestinatario);
  $mail->Subject = $asunto;
  $mail->Body = $cuerpoMensaje;
  $mail->IsHTML(true);

  if($mail->Send()) {
    $respuesta['estado'] = 'correcto';
    $respuesta['descripcion'] = 'mensaje-enviado';
  }
  else {
    $respuesta['estado'] = 'error';
    $respuesta['descripcion'] = $mail->ErrorInfo;
  }
}
else {
  $respuesta['estado'] = 'error';
  $respuesta['descripcion'] = 'Disculpe, ocurrió un error en el servidor al recibir las variables';
}

echo json_encode($respuesta);
exit();