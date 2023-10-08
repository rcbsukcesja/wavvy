package com.rcbsukcesja.hack2react.validations;

import com.rcbsukcesja.hack2react.exceptions.badrequest.InvalidFileException;
import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.Objects;

import static com.rcbsukcesja.hack2react.exceptions.messages.ErrorMessages.FILE_IS_EMPTY;
import static com.rcbsukcesja.hack2react.exceptions.messages.ErrorMessages.FILE_IS_NOT_IMAGE;

@Component
public class ImageFileValidation {

    public void validateImageFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new InvalidFileException(FILE_IS_EMPTY);
        }
        String[] imageExtensions = {"jpg", "jpeg", "png", "gif", "bmp"};
        String fileExtension = Objects.requireNonNull(FilenameUtils.getExtension(file.getOriginalFilename())).toLowerCase();
        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/") || !Arrays.asList(imageExtensions).contains(fileExtension)) {
            throw new InvalidFileException(FILE_IS_NOT_IMAGE);
        }
    }
}
