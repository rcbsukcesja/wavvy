package com.rcbsukcesja.hack2react.service;

import com.rcbsukcesja.hack2react.exceptions.io.StorageException;
import com.rcbsukcesja.hack2react.utils.FileUtils;
import com.rcbsukcesja.hack2react.validations.ImageFileValidation;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import static com.rcbsukcesja.hack2react.exceptions.messages.ErrorMessages.FILE_FAILED_TO_REMOVE;
import static com.rcbsukcesja.hack2react.exceptions.messages.ErrorMessages.FILE_FAILED_TO_STORE;

@Service
@RequiredArgsConstructor
public class StorageService {
    private final ImageFileValidation imageFileValidation;

    public void store(MultipartFile file, String id, String directory) {
        try {
            imageFileValidation.validateImageFile(file);
            Path fileNameAndPath = FileUtils.getPath(file, id, directory);
            Files.write(fileNameAndPath, file.getBytes());
        } catch (IOException e) {
            throw new StorageException(FILE_FAILED_TO_STORE, e);
        }
    }

    public void remove(String filePath) {
        try {
            Files.delete(Paths.get(filePath));
        } catch (IOException e) {
            throw new StorageException(FILE_FAILED_TO_REMOVE, e);
        }
    }
}
