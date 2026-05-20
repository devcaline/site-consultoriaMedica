<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método não permitido']);
    exit;
}

// Get JSON data from request body
$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Dados inválidos']);
    exit;
}

// Sanitize input data
$nome = htmlspecialchars(trim($data['nome'] ?? ''));
$email = htmlspecialchars(trim($data['email'] ?? ''));
$whatsapp = htmlspecialchars(trim($data['whatsapp'] ?? ''));
$clinica = htmlspecialchars(trim($data['clinica'] ?? ''));
$desafio = htmlspecialchars(trim($data['desafio'] ?? ''));

// Validate required fields
if (empty($nome) || empty($email) || empty($whatsapp) || empty($clinica) || empty($desafio)) {
    http_response_code(400);
    echo json_encode(['error' => 'Todos os campos são obrigatórios']);
    exit;
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Email inválido']);
    exit;
}

// Configurações de Email (Substitua pelos dados da sua hospedagem)
$to = 'contato@seu-dominio-portfolio.com.br'; // Email que receberá os leads do formulário
$subject = 'Novo lead do site - ' . $clinica;

// Debug: Log do email de destino (remover em produção se necessário)
error_log("Formulário enviado para: " . $to);

// Create HTML email body
$message = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <title>Novo Contato do Site</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #1a1a1a; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9f9f9; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        td { padding: 12px; border: 1px solid #ddd; }
        td:first-child { background-color: #f0f0f0; font-weight: bold; width: 30%; }
        .footer { padding: 15px; text-align: center; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>Storm Business</h1>
            <p>Novo Lead do Site</p>
        </div>
        <div class='content'>
            <p>Um novo contato foi recebido através do formulário do site:</p>
            <table>
                <tr>
                    <td>Nome</td>
                    <td>$nome</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td><a href='mailto:$email'>$email</a></td>
                </tr>
                <tr>
                    <td>WhatsApp</td>
                    <td>$whatsapp</td>
                </tr>
                <tr>
                    <td>Clínica</td>
                    <td>$clinica</td>
                </tr>
                <tr>
                    <td>Principal Desafio</td>
                    <td>$desafio</td>
                </tr>
            </table>
        </div>
        <div class='footer'>
            <p>Este email foi enviado automaticamente pelo site Storm Business.</p>
            <p>Data: " . date('d/m/Y H:i:s') . "</p>
        </div>
    </div>
</body>
</html>
";

// Email headers
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
$headers .= "From: Site Aceleradora <noreply@seu-dominio-portfolio.com.br>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email
$mailResult = mail($to, $subject, $message, $headers);

// Debug: Log do resultado
error_log("Tentativa de envio para: " . $to);
error_log("Resultado do mail(): " . ($mailResult ? 'sucesso' : 'falha'));

if ($mailResult) {
    echo json_encode([
        'success' => true, 
        'message' => 'Email enviado com sucesso para ' . $to
    ]);
} else {
    http_response_code(500);
    $errorMsg = 'Erro ao enviar email para ' . $to . '. Tente novamente mais tarde.';
    error_log("Erro ao enviar email: " . $errorMsg);
    echo json_encode([
        'error' => $errorMsg
    ]);
}
?>

