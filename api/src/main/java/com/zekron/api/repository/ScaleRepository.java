package com.zekron.api.repository;

import com.zekron.api.model.Scale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScaleRepository extends JpaRepository<Scale, Long> {

}
