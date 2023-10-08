package com.rcbsukcesja.hack2react.utils;

import lombok.experimental.UtilityClass;
import org.apache.commons.io.FilenameUtils;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;

@UtilityClass
public class FileUtils {
    public static String UPLOAD_DIRECTORY = System.getProperty("user.dir");

    public String getPathAsString(String fileExtension, String id, String dir) {
        if (Objects.isNull(fileExtension)) {
            return null;
        }
        return UPLOAD_DIRECTORY + "\\" + dir + "\\" + id + "." + fileExtension.toLowerCase();
    }

    public Path getPath(MultipartFile file, String id, String dir) {
        if (Objects.isNull(file)) {
            return null;
        }
        return Paths.get(UPLOAD_DIRECTORY + "/" + dir, id + "." + Objects.requireNonNull(FilenameUtils.getExtension(file.getOriginalFilename())).toLowerCase());
    }
}
