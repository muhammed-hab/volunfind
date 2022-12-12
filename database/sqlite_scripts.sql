-- Finding nonprofits with matching time
SELECT * FROM nonprofits WHERE id in (
  SELECT DISTINCT(times.nonprofitid) FROM
    (SELECT * FROM times WHERE times.nonprofitid IN
      (SELECT id FROM nonprofits WHERE nonprofits.category IN
        (VALUES ('animal shelter'), ('food bank')))
  ) times JOIN
    (WITH avail(day, start, end) AS (VALUES ('saturday', 11, 12), ('sunday', 9.5, 14)) SELECT * from avail) avail
      ON times.day=avail.day AND (avail.start <= times.end AND avail.end >= times.start)
  ORDER BY
    MIN(avail.end, times.end) - MAX(avail.start, times.start) DESC,
    times.start - avail.start DESC
    LIMIT 0, 10
);

-- Getting times for nonprofits
SELECT * FROM times WHERE nonprofitid in (VALUES (2), (3))
