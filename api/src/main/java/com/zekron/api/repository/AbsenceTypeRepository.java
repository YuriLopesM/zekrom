package com.zekron.api.repository;

import com.zekron.api.model.AbsenceType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AbsenceTypeRepository extends JpaRepository<AbsenceType, Long> {

}
