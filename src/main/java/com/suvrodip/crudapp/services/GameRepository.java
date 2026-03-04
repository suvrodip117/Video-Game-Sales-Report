package com.suvrodip.crudapp.services;

import com.suvrodip.crudapp.models.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GameRepository extends JpaRepository<Game,Integer> {

    @Query("SELECT DISTINCT game.platform FROM Game game")
    public List<String> getPlatforms();

    @Query("SELECT DISTINCT game.platformGroup FROM Game game")
    public List<String> getPlatformGroups();

    @Query("SELECT DISTINCT game.genre FROM Game game")
    public List<String> getGenres();
}
