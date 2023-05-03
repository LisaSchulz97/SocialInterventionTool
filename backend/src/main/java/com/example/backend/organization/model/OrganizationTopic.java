package com.example.backend.organization.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.List;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum OrganizationTopic {

    ARMUT("ARMUT", List.of("Schulden", "Hunger", "Obdachlosigkeit", "finanzielle Probleme", "Armut")),
    WOHNUNG("WOHNUNG", List.of("Wohnung", "Obdachlosigkeit", "keine Wohnung", "Nachbarschaftsstreit", "Kriminalität", "laute Gegend", "Ruhestörung")),
    EINSAMKEIT("EINSAMKEIT", List.of("Einsamkeit", "Depression", "alleine sein", "keine Freunde", "soziale Isolation", "sozialer Rückzug", "keine Familie", "fehlender sozialer Rückhalt", "kein soziales Netzwerk")),
    KULTUR("KULTUR", List.of("Kultur", "Migrationshintergrund", "Staatsangehörigkeit", "Religion", "Migration")),
    ARBEIT("ARBEIT", List.of("Arbeitslosigkeit", "unzufrieden im Job", "überarbeitet", "überlastet", "Burnout", "Mobbing im Job", "Mobbing")),
    AUSBILDUNG("AUSBILDUNG", List.of("keine Ausbildung", "Schulabbruch", "kein Abschluss", "Ausbildung")),
    BEZIEHUNG("BEZIEHUNG", List.of("Beziehungsprobleme", "Partnerschaftsprobleme", "Scheidung", "Beziehung")),
    ERKRANKUNG("ERKRANKUNG", List.of("chronische Erkrankungen", "chronische Erkrankung", "Erkrankung")),
    PFLEGE("PFLEGE", List.of("Pflegefall", "familiärer Pflegefall", "Pflege eines Angehörigen", "Pflege")),
    MISSBRAUCH("MISSBRAUCH", List.of("sexuelle Gewalt", "sexuelle Belästigung", "Gewaltopfer", "Gewalterfahrungen", "Gewalt", "Missbrauch", "häusliche Gewalt", "Gewaltschutz"));

    private final String name;

    public String getName() {
        return name;
    }

    private final List<String> searchTerms;

    public List<String> getSearchTerms() {
        return searchTerms;
    }

    OrganizationTopic(String name, List<String> searchTerms) {
        this.name = name;
        this.searchTerms = searchTerms;
    }
}












