package com.zekron.api.repository;

import com.zekron.api.model.CompTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompTimeRepository extends JpaRepository<CompTime, Long> {

}
