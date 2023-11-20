package com.zekron.api.resource;

import com.zekron.api.model.AbsenceType;
import com.zekron.api.repository.AbsenceTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
public class TestController {
    @Autowired
    public AbsenceTypeRepository absenceTypeRepository;

    @GetMapping("/test")
    public String test() {
        AbsenceType absenceType = new AbsenceType();
        absenceType.setName("Atestado");
        absenceType.setCreatedAt(LocalDate.now());
        absenceType.setUpdatedAt(LocalDate.now());

        absenceType.toString();

        absenceTypeRepository.save(absenceType);

        return "Ok - Tipo de Falta: " + absenceType.getId();
    };
}
