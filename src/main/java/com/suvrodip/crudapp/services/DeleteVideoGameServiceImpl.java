package com.suvrodip.crudapp.services;

import com.suvrodip.crudapp.models.Game;
import org.springframework.stereotype.Service;

@Service
public class DeleteVideoGameServiceImpl implements DeleteVideoGameService{

    private final GameRepository gameRepository;

    public DeleteVideoGameServiceImpl(GameRepository gameRepository){
        this.gameRepository=gameRepository;
    }

    @Override
    public String deleteVideoGame(Integer id){
        this.gameRepository.deleteById(id);
        return "Video Game Id "+id+" is deleted successfully.";
    }
}
