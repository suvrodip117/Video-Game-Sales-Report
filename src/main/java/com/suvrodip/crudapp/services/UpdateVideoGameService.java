package com.suvrodip.crudapp.services;

import com.suvrodip.crudapp.models.dto.UpdateGameRequestDTO;

public interface UpdateVideoGameService {
    String updateVideoGameById(Integer id, UpdateGameRequestDTO request);
}
