package com.example.backend.organization.model;

import java.util.List;


public enum OrganizationTopic {

    ARMUT(List.of("Schulden", "Hunger", "Obdachlosigkeit", "finanzielle Probleme", "Armut")),
    WOHNUNG(List.of("Wohnung", "Obdachlosigkeit", "keine Wohnung", "Nachbarschaftsstreit", "Kriminalität", "laute Gegend", "Ruhestörung")),
    EINSAMKEIT(List.of("Einsamkeit", "Depression", "alleine sein", "keine Freunde", "soziale Isolation", "sozialer Rückzug", "keine Familie", "fehlender sozialer Rückhalt", "kein soziales Netzwerk")),
    KULTUR(List.of("Kultur", "Migrationshintergrund", "Staatsangehörigkeit", "Religion", "Migration")),
    ARBEIT(List.of("Arbeitslosigkeit", "unzufrieden im Job", "überarbeitet", "überlastet", "Burnout", "Mobbing im Job", "Mobbing")),
    AUSBILDUNG(List.of("keine Ausbildung", "Schulabbruch", "kein Abschluss", "Ausbildung")),
    BEZIEHUNG(List.of("Beziehungsprobleme", "Partnerschaftsprobleme", "Scheidung", "Beziehung")),
    ERKRANKUNG(List.of("chronische Erkrankungen", "chronische Erkrankung", "Erkrankung")),
    PFLEGE(List.of("Pflegefall", "familiärer Pflegefall", "Pflege eines Angehörigen", "Pflege")),
    MISSBRAUCH(List.of("sexuelle Gewalt", "sexuelle Belästigung", "Gewaltopfer", "Gewalterfahrungen", "Gewalt", "Missbrauch", "häusliche Gewalt", "Gewaltschutz"));


    private final List<String> searchTerms;

    OrganizationTopic(List<String> searchTerms) {
        this.searchTerms = searchTerms;
    }
}












