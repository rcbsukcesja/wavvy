package com.rcbsukcesja.hack2react.notificator.mail;

import com.rcbsukcesja.hack2react.model.entity.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MessageManager {

    private final static String MESSAGE_FROM_WAVVY = "Wiadomość z wavvy";
    private final static String WELCOME_SUBJECT = "Witaj !";
    private final static String WELCOME_TXT = "W Szczebrzeszynie chrząszcz brzmi w trzcinie\n" +
            "I Szczebrzeszyn z tego słynie.";

    private final GmailIntegration gmailIntegration;

    public void sendWelcomeMessage(String toEmail) {
        gmailIntegration.sendSimpleEmail(toEmail, WELCOME_SUBJECT, WELCOME_TXT);

    }

    public void sendMessageToUser(Message message){
        gmailIntegration.sendSimpleEmail(message.getToUser().getEmail(), MESSAGE_FROM_WAVVY, message.getText());
    }
}
