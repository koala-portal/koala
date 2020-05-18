package com.koala.portal.repos;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.koala.portal.domain.history.EntityType;
import com.koala.portal.models.HistoryEntry;

@Repository
public interface HistoryEntryRepo extends CrudRepository<HistoryEntry, Long> {
	public List<HistoryEntry> findByEntityIdAndEntityTypeOrderByDoneOn(long entityId, EntityType entityType);
}
